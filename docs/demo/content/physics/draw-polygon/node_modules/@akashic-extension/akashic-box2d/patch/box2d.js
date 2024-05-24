/*
 * This file is based on box2dweb (https://github.com/mikolalysenko/box2dweb)
 * which is released under the following license.
 */

/*
 * Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

var b2 = require("box2dweb");

function patchBox2D(box2d, opts) {
    opts = opts || {};
    var maxTOILoop = typeof opts.maxTOILoop === "number" ? opts.maxTOILoop : (Number.MAX_SAFE_INTEGER || 9007199254740991);

    // https://www.ecma-international.org/ecma-262/6.0/#sec-number.epsilon
    var EPSILON = 2.2204460492503130808472633361816e-16;

    var b2Settings = b2.Common.b2Settings,
        b2Body = b2.Dynamics.b2Body,
        b2World = b2.Dynamics.b2World,
        b2Contact = b2.Dynamics.Contacts.b2Contact;

    // alter https://github.com/mikolalysenko/box2dweb/blob/87ba08d7fc7cdd15235cb6c8bd79f24a92874198/box2d.js#L6271
    box2d.world.SolveTOI = function (step) {
        var b;
        var fA;
        var fB;
        var bA;
        var bB;
        var cEdge;
        var j;
        var island = this.m_island;
        island.Initialize(this.m_bodyCount, b2Settings.b2_maxTOIContactsPerIsland, b2Settings.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        var queue = b2World.s_queue;
        for (b = this.m_bodyList; b; b = b.m_next) {
            b.m_flags &= ~b2Body.e_islandFlag;
            b.m_sweep.t0 = 0.0;
        }
        var c;
        for (c = this.m_contactList; c; c = c.m_next) {
            c.m_flags &= ~(b2Contact.e_toiFlag | b2Contact.e_islandFlag);
        }
        for (j = this.m_jointList; j; j = j.m_next) {
            j.m_islandFlag = false;
        }

        // 物理計算を中断するためのカウンタを追加。
        // 物理計算のためにフレームレートが低下するケースに対処できるよう、
        // 最大ループ回数を導入する。
        //
        // 修正前:
        //   for (;;) {
        // 修正後:
        //   for (var toiLoopCount = 0; toiLoopCount < maxTOILoop; ++toiLoopCount) {
        for (var toiLoopCount = 0; toiLoopCount < maxTOILoop; ++toiLoopCount) {

            var minContact = null;
            var minTOI = 1.0;
            for (c = this.m_contactList; c; c = c.m_next) {
                if (c.IsSensor() == true || c.IsEnabled() == false || c.IsContinuous() == false) {
                    continue;
                }
                var toi = 1.0;
                if (c.m_flags & b2Contact.e_toiFlag) {
                    toi = c.m_toi;
                } else {
                    fA = c.m_fixtureA;
                    fB = c.m_fixtureB;
                    bA = fA.m_body;
                    bB = fB.m_body;
                    if ((bA.GetType() != b2Body.b2_dynamicBody || bA.IsAwake() == false) && (bB.GetType() != b2Body.b2_dynamicBody || bB.IsAwake() == false)) {
                        continue;
                    }
                    var t0 = bA.m_sweep.t0;
                    if (bA.m_sweep.t0 < bB.m_sweep.t0) {
                        t0 = bB.m_sweep.t0;
                        bA.m_sweep.Advance(t0);
                    } else if (bB.m_sweep.t0 < bA.m_sweep.t0) {
                        t0 = bA.m_sweep.t0;
                        bB.m_sweep.Advance(t0);
                    }
                    toi = c.ComputeTOI(bA.m_sweep, bB.m_sweep);
                    b2Settings.b2Assert(0.0 <= toi && toi <= 1.0);
                    if (toi > 0.0 && toi < 1.0) {
                        toi = (1.0 - toi) * t0 + toi;
                        if (toi > 1) toi = 1;
                    }
                    c.m_toi = toi;
                    c.m_flags |= b2Contact.e_toiFlag;
                }
                if (Number.MIN_VALUE < toi && toi < minTOI) {
                    minContact = c;
                    minTOI = toi;
                }
            }
            // 無限ループすることがある問題の修正。
            //
            // 修正前:
            //   if (minContact == null || 1.0 - 100.0 * Number.MIN_VALUE < minTOI)
            // 修正後:
            //   if (minContact == null || 1.0 - 100.0 * EPSILON < minTOI)
            //
            // box2dweb の実装では情報落ちしていたため、本家 box2d の実装に揃えた。
            if (minContact == null || 1.0 - 100.0 * EPSILON < minTOI) {
                break;
            }
            fA = minContact.m_fixtureA;
            fB = minContact.m_fixtureB;
            bA = fA.m_body;
            bB = fB.m_body;
            b2World.s_backupA.Set(bA.m_sweep);
            b2World.s_backupB.Set(bB.m_sweep);
            bA.Advance(minTOI);
            bB.Advance(minTOI);
            minContact.Update(this.m_contactManager.m_contactListener);
            minContact.m_flags &= ~b2Contact.e_toiFlag;
            if (minContact.IsSensor() == true || minContact.IsEnabled() == false) {
                bA.m_sweep.Set(b2World.s_backupA);
                bB.m_sweep.Set(b2World.s_backupB);
                bA.SynchronizeTransform();
                bB.SynchronizeTransform();
                continue;
            }
            if (minContact.IsTouching() == false) {
                continue;
            }
            var seed = bA;
            if (seed.GetType() != b2Body.b2_dynamicBody) {
                seed = bB;
            }
            island.Clear();
            var queueStart = 0;
            var queueSize = 0;
            queue[queueStart + queueSize++] = seed;
            seed.m_flags |= b2Body.e_islandFlag;
            while (queueSize > 0) {
                b = queue[queueStart++];
                --queueSize;
                island.AddBody(b);
                if (b.IsAwake() == false) {
                    b.SetAwake(true);
                }
                if (b.GetType() != b2Body.b2_dynamicBody) {
                    continue;
                }
                for (cEdge = b.m_contactList; cEdge; cEdge = cEdge.next) {
                    if (island.m_contactCount == island.m_contactCapacity) {
                        break;
                    }
                    if (cEdge.contact.m_flags & b2Contact.e_islandFlag) {
                        continue;
                    }
                    if (cEdge.contact.IsSensor() == true || cEdge.contact.IsEnabled() == false || cEdge.contact.IsTouching() == false) {
                        continue;
                    }
                    island.AddContact(cEdge.contact);
                    cEdge.contact.m_flags |= b2Contact.e_islandFlag;
                    var other = cEdge.other;
                    if (other.m_flags & b2Body.e_islandFlag) {
                        continue;
                    }
                    if (other.GetType() != b2Body.b2_staticBody) {
                        other.Advance(minTOI);
                        other.SetAwake(true);
                    }
                    queue[queueStart + queueSize] = other;
                    ++queueSize;
                    other.m_flags |= b2Body.e_islandFlag;
                }
                for (var jEdge = b.m_jointList; jEdge; jEdge = jEdge.next) {
                    if (island.m_jointCount == island.m_jointCapacity) continue;
                    if (jEdge.joint.m_islandFlag == true) continue;
                    other = jEdge.other;
                    if (other.IsActive() == false) {
                        continue;
                    }
                    island.AddJoint(jEdge.joint);
                    jEdge.joint.m_islandFlag = true;
                    if (other.m_flags & b2Body.e_islandFlag) continue;
                    if (other.GetType() != b2Body.b2_staticBody) {
                        other.Advance(minTOI);
                        other.SetAwake(true);
                    }
                    queue[queueStart + queueSize] = other;
                    ++queueSize;
                    other.m_flags |= b2Body.e_islandFlag;
                }
            }
            var subStep = b2World.s_timestep;
            subStep.warmStarting = false;
            subStep.dt = (1.0 - minTOI) * step.dt;
            subStep.inv_dt = 1.0 / subStep.dt;
            subStep.dtRatio = 0.0;
            subStep.velocityIterations = step.velocityIterations;
            subStep.positionIterations = step.positionIterations;
            island.SolveTOI(subStep);
            var i = 0;
            for (i = 0; i < island.m_bodyCount; ++i) {
                b = island.m_bodies[i];
                b.m_flags &= ~b2Body.e_islandFlag;
                if (b.IsAwake() == false) {
                    continue;
                }
                if (b.GetType() != b2Body.b2_dynamicBody) {
                    continue;
                }
                b.SynchronizeFixtures();
                for (cEdge = b.m_contactList; cEdge; cEdge = cEdge.next) {
                    cEdge.contact.m_flags &= ~b2Contact.e_toiFlag;
                }
            }
            for (i = 0; i < island.m_contactCount; ++i) {
                c = island.m_contacts[i];
                c.m_flags &= ~(b2Contact.e_toiFlag | b2Contact.e_islandFlag);
            }
            for (i = 0; i < island.m_jointCount; ++i) {
                j = island.m_joints[i];
                j.m_islandFlag = false;
            }
            this.m_contactManager.FindNewContacts();
        }
    };
}

module.exports = {
    patchBox2D: patchBox2D
};
