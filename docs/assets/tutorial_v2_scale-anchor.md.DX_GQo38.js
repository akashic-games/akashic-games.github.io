import{_ as s}from"./chunks/player.D-dI_Wms.js";import{_ as i,c as a,o as n,a3 as e}from"./chunks/framework.DaCD_bki.js";const p="/assets/sample_scale-anchor_01.CdGW4rl3.png",h="/assets/sample_scale-anchor_02.jy49fQVO.png",l="/assets/sample_scale-anchor_03.DJbKVcX-.png",t="/assets/sample_scale-anchor_04.C61D6_Fi.png",_=JSON.parse('{"title":"拡縮とアンカーポイント","description":"","frontmatter":{},"headers":[],"relativePath":"tutorial/v2/scale-anchor.md","filePath":"tutorial/v2/scale-anchor.md"}'),k={name:"tutorial/v2/scale-anchor.md"},c=e(`<h1 id="拡縮とアンカーポイント" tabindex="-1">拡縮とアンカーポイント <a class="header-anchor" href="#拡縮とアンカーポイント" aria-label="Permalink to &quot;拡縮とアンカーポイント&quot;">​</a></h1><p>このページのサンプルコードを<a href="https://github.com/akashic-contents/website-contents/releases/latest/download/tutorial-samples-v2-sample-scale-anchor.zip" target="_blank" rel="noreferrer">ダウンロード</a></p><h2 id="scale-and-rot" tabindex="-1">拡縮と回転 <a class="header-anchor" href="#scale-and-rot" aria-label="Permalink to &quot;拡縮と回転 {#scale-and-rot}&quot;">​</a></h2><p>エンティティを拡大・縮小して描画するには、<code>scaleX</code> と <code>scaleY</code> プロパティを利用します。 また回転させるには <code>angle</code> プロパティを利用します。 (参考: <a href="./2-basic.html#entity">エンティティの節</a> の表)</p><p>たとえば以下のように生成した <code>Sprite</code> は、 元のサイズよりも横方向に 2 倍、縦方向に 1.5 倍拡大してさらに 45 度回転した状態で描画されます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sprite </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Sprite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scene: scene, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// シーン scene があるものとします</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  src: scene.assets[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;player&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// アセットID &quot;player&quot; が画像アセットだとします</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  x: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  y: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scaleX: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scaleY: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  angle: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">45</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sprite);</span></span></code></pre></div><p>画像アセット &quot;player&quot; が次のような画像の場合、</p><p><img src="`+s+'" alt="player.png"></p><p>これは次のような表示になります。 画面左上端で拡大したので見切れています。</p><p><img src="'+p+`" alt="拡大・回転のゲーム画面"></p><p>拡縮や回転角度は、生成後に同名のプロパティを通して変更することもできます。 (参考: <a href="./3-animation.html#animation">アニメーションの節</a> の表)</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 縦横ともに等倍にする</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sprite.scaleX </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sprite.scaleY </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 回転角度を 0 度にする</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sprite.angle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 変更を反映</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sprite.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modified</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><p>次のような表示になります。</p><p><img src="`+h+`" alt="拡大・回転を戻したゲーム画面"></p><h2 id="anchor" tabindex="-1">アンカーポイント <a class="header-anchor" href="#anchor" aria-label="Permalink to &quot;アンカーポイント {#anchor}&quot;">​</a></h2><p>上の例でわかるように、エンティティの拡大・縮小・回転は、デフォルトではエンティティの中心を基準に行われます。 一方で、移動 (<code>x</code>, <code>y</code>) はエンティティの左上端を基準に行われます。</p><p>エンティティにアンカーポイントを指定することで、この両方を統一して設定できます。 アンカーポイントは <code>anchorX</code>, <code>anchorY</code> プロパティで与えることができます。 (akashic-engine@2.5.4 以降 (akashic-cli@1.7.28 以降))</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> sprite </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Sprite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scene: scene,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  src: scene.assets[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;player&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// アセットID &quot;player&quot; が画像アセットだとします</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  x: g.game.width, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// g.game.width と height はゲーム画面の幅と高さです</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  y: g.game.height,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  angle: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">25</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scaleX: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scaleY: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  anchorX: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1.0 でエンティティの右端</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  anchorY: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 1.0 でエンティティの下端</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sprite); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// シーン scene があるものとします</span></span></code></pre></div><p><code>anchorX</code>, <code>anchorY</code> は <code>0.0</code> がエンティティの左端・上端を、 <code>1.0</code> がエンティティの右端・下端を表します。 この例ではどちらも <code>1.0</code> を与えているので、この <code>Sprite</code> は右下端を基準に配置され、次のような表示になります。</p><p><img src="`+l+`" alt="アンカーポイントを指定したゲーム画面"></p><p>エンティティの X, Y 座標を画面右下端 (<code>g.game.width</code>, <code>g.game.height</code>) にしていますが、 基準がエンティティの右下端なので、ちょうど画面右下端に沿う位置に配置されます。 またエンティティ右下端を基準に拡大・回転されて、ゲーム画面から一部見切れています。</p><p>アンカーポイントもやはり生成後に変更することができます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// アンカーポイントをエンティティ下端の中央にする</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sprite.anchorX </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sprite.anchorY </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// わかりやすさのため回転をリセット</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sprite.angle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 変更を反映</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sprite.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modified</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><p>これを実行すると次のような表示になります。</p><p><img src="`+t+'" alt="アンカーポイントを動かしたゲーム画面"></p><p><code>anchorX</code>, <code>anchorY</code> の初期値は <code>undefined</code> です。 初期値の場合、拡大・回転はエンティティ中心を、移動はエンティティの左上端を基準に行われます。 <code>anchorX</code>, <code>anchorY</code> は、どちらも数値であるか、どちらも <code>undefined</code> でなければなりません。</p><blockquote><p>移動 (<code>x</code>, <code>y</code>) の原点と回転・拡縮 (<code>scaleX</code>, <code>scaleY</code>, <code>angle</code>) の原点がデフォルトで異なっているのは、 歴史的経緯によるものです。 検討中の Akashic Engine の次期メジャーバージョン (v3) ではこの挙動を廃し、 <code>anchorX</code>, <code>anchorY</code> いずれも初期値を <code>0.0</code> にすることを検討しています。 そのため回転や拡縮を行うエンティティは、アンカーポイントを明示的に指定しておくことを推奨します。</p></blockquote>',27),d=[c];function r(E,o,g,y,F,C){return n(),a("div",null,d)}const D=i(k,[["render",r]]);export{_ as __pageData,D as default};