import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.459ab1e9.js";const u=JSON.parse('{"title":"ローカルイベントからグローバルに通知する","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/multiplay/notify-local-to-global.md","filePath":"reverse-reference/v3/multiplay/notify-local-to-global.md"}'),p={name:"reverse-reference/v3/multiplay/notify-local-to-global.md"},o=l(`<h1 id="ローカルイベントからグローバルに通知する" tabindex="-1">ローカルイベントからグローバルに通知する <a class="header-anchor" href="#ローカルイベントからグローバルに通知する" aria-label="Permalink to &quot;ローカルイベントからグローバルに通知する&quot;">​</a></h1><p>ローカルイベントの処理を行った結果として、グローバル (マルチプレイの全プレイヤー) に通知するには <code>g.game.raiseEvent()</code> を利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// raiseEvent()で全プレイヤーに難易度を通知</span></span>
<span class="line"><span style="color:#E1E4E8;">g.game.</span><span style="color:#B392F0;">raiseEvent</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">MessageEvent</span><span style="color:#E1E4E8;">({ level: </span><span style="color:#9ECBFF;">&quot;easy&quot;</span><span style="color:#E1E4E8;"> }));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// raiseEvent()で全プレイヤーに難易度を通知</span></span>
<span class="line"><span style="color:#24292E;">g.game.</span><span style="color:#6F42C1;">raiseEvent</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">MessageEvent</span><span style="color:#24292E;">({ level: </span><span style="color:#032F62;">&quot;easy&quot;</span><span style="color:#24292E;"> }));</span></span></code></pre></div><h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>ローカルイベントの処理中に、グローバル (マルチプレイの全プレイヤー) に通知したい時に <code>g.game.raiseEvent()</code> 利用します。</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>ローカルイベントは、そのイベントを発生させたプレイヤーにだけ通知されるイベントです。 特に、 <code>touchable</code> なローカルエンティティをクリック・タッチした場合に発生します。</p><p>参考: <a href="./local-entity.html">逆引きリファレンス » ローカルエンティティを使う</a></p></div><p>この関数は、特にゲーム開発者が自由に使える汎用のイベント <code>g.MessageEvent</code> と組み合わせて利用します。 <code>g.game.raiseEvent()</code> に <code>g.MessageEvent</code> を与えると、マルチプレイの全プレイヤーのデバイス上で <code>g.Scene#onMessage</code> のハンドラが呼び出されます。</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><code>raiseEvent()</code> は、ローカル処理 (ローカルイベントの処理と、それに起因して発生した処理) の中 <strong>でのみ</strong> 利用してください。 ローカル処理でないコードから呼び出すと、全員のデバイスから全員に向けてイベントを送ることになり、輻輳・重複します。</p></div><h3 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h3><p>下記のコードでは、放送者にのみ表示した難易度選択ボタンが押下され、一定時間経過した時に <code>g.game.raiseEvent()</code> で選択された難易度を全体に通知します。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> difficultyLevel </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;normal&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">param</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">scene</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Scene</span><span style="color:#E1E4E8;">({ game: g.game });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> firstJoinedPlayerId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> remainingTime </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> intervalId;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> labelGroup;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  g.game.onJoin.</span><span style="color:#B392F0;">addOnce</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">ev</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    firstJoinedPlayerId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ev.player.id;</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  scene.onLoad.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 難易度のラベル作成</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">easyLabel</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createDifficultyLabel</span><span style="color:#E1E4E8;">(scene, </span><span style="color:#9ECBFF;">&quot;easy&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">normalLabel</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createDifficultyLabel</span><span style="color:#E1E4E8;">(scene, </span><span style="color:#9ECBFF;">&quot;normal&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">hardLabel</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createDifficultyLabel</span><span style="color:#E1E4E8;">(scene, </span><span style="color:#9ECBFF;">&quot;hard&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">60</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    labelGroup </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">E</span><span style="color:#E1E4E8;">({ scene: scene, hidden: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> });</span></span>
<span class="line"><span style="color:#E1E4E8;">    labelGroup.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(easyLabel);</span></span>
<span class="line"><span style="color:#E1E4E8;">    labelGroup.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(normalLabel);</span></span>
<span class="line"><span style="color:#E1E4E8;">    labelGroup.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(hardLabel);</span></span>
<span class="line"><span style="color:#E1E4E8;">    scene.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(labelGroup);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">timerLabel</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Label</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      scene: scene,</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">\`開始まで \${</span><span style="color:#E1E4E8;">remainingTime</span><span style="color:#9ECBFF;">} 秒\`</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      font: font,</span></span>
<span class="line"><span style="color:#E1E4E8;">      y: g.game.height </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">50</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    intervalId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scene.</span><span style="color:#B392F0;">setInterval</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      remainingTime</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (remainingTime </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        timerLabel.text </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`開始まで \${</span><span style="color:#E1E4E8;">remainingTime</span><span style="color:#9ECBFF;">} 秒\`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        timerLabel.</span><span style="color:#B392F0;">invalidate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    scene.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(timerLabel);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  scene.onMessage.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">ev</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (ev.data.level) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 難易度の値を受け取る</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(ev.data.level);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  scene.onUpdate.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">ev</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (g.game.selfId </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> firstJoinedPlayerId) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">labelGroup.</span><span style="color:#B392F0;">visible</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        labelGroup.</span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 最初に join したプレイヤーのみ難易度のラベルを表示</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (remainingTime </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">intervalId.</span><span style="color:#B392F0;">destroyed</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        scene.</span><span style="color:#B392F0;">clearInterval</span><span style="color:#E1E4E8;">(intervalId);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 残り時間が 0 となった時、現在の難易度を raiseEvent() でブロードキャスト</span></span>
<span class="line"><span style="color:#E1E4E8;">        g.game.</span><span style="color:#B392F0;">raiseEvent</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">MessageEvent</span><span style="color:#E1E4E8;">({ level: difficultyLevel }));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">  g.game.</span><span style="color:#B392F0;">pushScene</span><span style="color:#E1E4E8;">(scene);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createDifficultyLabel</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">scene</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">text</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">y</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">label</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Label</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 必要プロパティ</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    label.onPointDown.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">ev</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        difficultyLevel </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> label.text;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> label;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> difficultyLevel </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;normal&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#E36209;">param</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">scene</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Scene</span><span style="color:#24292E;">({ game: g.game });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> firstJoinedPlayerId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> remainingTime </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> intervalId;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> labelGroup;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  g.game.onJoin.</span><span style="color:#6F42C1;">addOnce</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">ev</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    firstJoinedPlayerId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ev.player.id;</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  scene.onLoad.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 難易度のラベル作成</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">easyLabel</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createDifficultyLabel</span><span style="color:#24292E;">(scene, </span><span style="color:#032F62;">&quot;easy&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">normalLabel</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createDifficultyLabel</span><span style="color:#24292E;">(scene, </span><span style="color:#032F62;">&quot;normal&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">hardLabel</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createDifficultyLabel</span><span style="color:#24292E;">(scene, </span><span style="color:#032F62;">&quot;hard&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">60</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    labelGroup </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">E</span><span style="color:#24292E;">({ scene: scene, hidden: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> });</span></span>
<span class="line"><span style="color:#24292E;">    labelGroup.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(easyLabel);</span></span>
<span class="line"><span style="color:#24292E;">    labelGroup.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(normalLabel);</span></span>
<span class="line"><span style="color:#24292E;">    labelGroup.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(hardLabel);</span></span>
<span class="line"><span style="color:#24292E;">    scene.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(labelGroup);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">timerLabel</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Label</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      scene: scene,</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">\`開始まで \${</span><span style="color:#24292E;">remainingTime</span><span style="color:#032F62;">} 秒\`</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      font: font,</span></span>
<span class="line"><span style="color:#24292E;">      y: g.game.height </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">50</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    intervalId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scene.</span><span style="color:#6F42C1;">setInterval</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      remainingTime</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (remainingTime </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        timerLabel.text </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`開始まで \${</span><span style="color:#24292E;">remainingTime</span><span style="color:#032F62;">} 秒\`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        timerLabel.</span><span style="color:#6F42C1;">invalidate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    scene.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(timerLabel);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  scene.onMessage.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">ev</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (ev.data.level) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 難易度の値を受け取る</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(ev.data.level);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  scene.onUpdate.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">ev</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (g.game.selfId </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> firstJoinedPlayerId) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">labelGroup.</span><span style="color:#6F42C1;">visible</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        labelGroup.</span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 最初に join したプレイヤーのみ難易度のラベルを表示</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (remainingTime </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">intervalId.</span><span style="color:#6F42C1;">destroyed</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        scene.</span><span style="color:#6F42C1;">clearInterval</span><span style="color:#24292E;">(intervalId);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 残り時間が 0 となった時、現在の難易度を raiseEvent() でブロードキャスト</span></span>
<span class="line"><span style="color:#24292E;">        g.game.</span><span style="color:#6F42C1;">raiseEvent</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">MessageEvent</span><span style="color:#24292E;">({ level: difficultyLevel }));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">  g.game.</span><span style="color:#6F42C1;">pushScene</span><span style="color:#24292E;">(scene);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createDifficultyLabel</span><span style="color:#24292E;">(</span><span style="color:#E36209;">scene</span><span style="color:#24292E;">, </span><span style="color:#E36209;">text</span><span style="color:#24292E;">, </span><span style="color:#E36209;">x</span><span style="color:#24292E;">, </span><span style="color:#E36209;">y</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">label</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Label</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">...</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 必要プロパティ</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    label.onPointDown.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">ev</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        difficultyLevel </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> label.text;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> label;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,12),e=[o];function c(t,r,E,y,i,F){return n(),a("div",null,e)}const g=s(p,[["render",c]]);export{u as __pageData,g as default};