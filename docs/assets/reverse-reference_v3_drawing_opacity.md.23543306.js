import{_ as n,C as p,o as e,c as l,H as o,Q as s}from"./chunks/framework.459ab1e9.js";const _=JSON.parse('{"title":"半透明にする (透明度を変える)","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/drawing/opacity.md","filePath":"reverse-reference/v3/drawing/opacity.md"}'),c={name:"reverse-reference/v3/drawing/opacity.md"},t=s(`<h1 id="半透明にする-透明度を変える" tabindex="-1">半透明にする (透明度を変える) <a class="header-anchor" href="#半透明にする-透明度を変える" aria-label="Permalink to &quot;半透明にする (透明度を変える)&quot;">​</a></h1><p>エンティティの透明度を変更するには、<code>opacity</code> プロパティを利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> sprite </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Sprite</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">,      </span><span style="color:#6A737D;">// その他のプロパティ</span></span>
<span class="line"><span style="color:#E1E4E8;">  opacity: </span><span style="color:#79B8FF;">0.5</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 半透明にした状態で表示する</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> sprite </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Sprite</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">,      </span><span style="color:#6A737D;">// その他のプロパティ</span></span>
<span class="line"><span style="color:#24292E;">  opacity: </span><span style="color:#005CC5;">0.5</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 半透明にした状態で表示する</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sprite.opacity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 完全に不透明にする</span></span>
<span class="line"><span style="color:#E1E4E8;">sprite.</span><span style="color:#B392F0;">modified</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// modified() で表示に反映</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sprite.opacity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 完全に不透明にする</span></span>
<span class="line"><span style="color:#24292E;">sprite.</span><span style="color:#6F42C1;">modified</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// modified() で表示に反映</span></span></code></pre></div><p><code>opacity</code> は不透明度を表し、 0.0 (完全に透明) ～ 1.0(完全に不透明) の数値で指定できます。初期値は <code>1</code> となります。 値は、 0.0 未満の場合、もしくは 1.0 を超えた値の場合は完全に不透明で表示されます。</p><p>非表示・表示を切り替えるだけの場合、 <a href="./hidden.html">hide(), show()も利用できます。</a></p><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツは、画像 (を表示する <code>g.Sprite</code>) を半透明の状態で表示します。</p>`,9),r=s(`<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>エンティティの透明度を変更するには <code>opacity</code> プロパティを利用します。</p><p>下記のコードでは、生成した <code>Sprite</code> は 完全に透明の状態で描画されます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> sprite </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Sprite</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  scene: scene,</span></span>
<span class="line"><span style="color:#E1E4E8;">  src: scene.asset.</span><span style="color:#B392F0;">getImageById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;player&quot;</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// アセットID &quot;player&quot; が画像アセットだとします</span></span>
<span class="line"><span style="color:#E1E4E8;">  x: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  y: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  opacity: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">scene.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(sprite);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> sprite </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Sprite</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  scene: scene,</span></span>
<span class="line"><span style="color:#24292E;">  src: scene.asset.</span><span style="color:#6F42C1;">getImageById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;player&quot;</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// アセットID &quot;player&quot; が画像アセットだとします</span></span>
<span class="line"><span style="color:#24292E;">  x: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  y: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  opacity: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">scene.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(sprite);</span></span></code></pre></div><p>生成後のエンティティの透明度は、 <code>opacity</code> プロパティで参照できます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sprite.opacity; </span><span style="color:#6A737D;">// ==&gt; 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sprite.opacity; </span><span style="color:#6A737D;">// ==&gt; 0</span></span></code></pre></div><p><code>opacity</code> プロパティに代入することで、透明度を変更できます。表示への反映には <code>modified()</code> メソッドを呼び出す必要があります。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sprite.opacity </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0.1</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 現状からさらに 10 パーセントポイント不透明にする</span></span>
<span class="line"><span style="color:#E1E4E8;">sprite.</span><span style="color:#B392F0;">modified</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// modified() で表示に反映</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sprite.opacity </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.1</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 現状からさらに 10 パーセントポイント不透明にする</span></span>
<span class="line"><span style="color:#24292E;">sprite.</span><span style="color:#6F42C1;">modified</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// modified() で表示に反映</span></span></code></pre></div><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/akashic-engine/v3/classes/E.html#opacity">API リファレンス</a></li></ul>`,10);function i(y,E,d,h,g,v){const a=p("PlaygroundElement");return e(),l("div",null,[t,o(a,{gameJsonUri:"/snippets/reverse-reference/drawing/opacity/game.json",width:600,height:400}),r])}const m=n(c,[["render",i]]);export{_ as __pageData,m as default};