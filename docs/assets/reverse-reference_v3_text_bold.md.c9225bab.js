import{_ as n,C as o,o as e,c as l,H as p,Q as s}from"./chunks/framework.459ab1e9.js";const f=JSON.parse('{"title":"文字列を太字にする","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/text/bold.md","filePath":"reverse-reference/v3/text/bold.md"}'),t={name:"reverse-reference/v3/text/bold.md"},c=s(`<h1 id="文字列を太字にする" tabindex="-1">文字列を太字にする <a class="header-anchor" href="#文字列を太字にする" aria-label="Permalink to &quot;文字列を太字にする&quot;">​</a></h1><p>文字列を太字にするには <code>g.DynamicFont</code> の <code>fontWeight</code> プロパティで <code>&quot;bold&quot;</code> を指定します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> font </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">DynamicFont</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  game: g.game,</span></span>
<span class="line"><span style="color:#E1E4E8;">  fontFamily: </span><span style="color:#9ECBFF;">&quot;sans-serif&quot;</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;">// フォントファミリ</span></span>
<span class="line"><span style="color:#E1E4E8;">  fontWeight: </span><span style="color:#9ECBFF;">&quot;bold&quot;</span><span style="color:#E1E4E8;">,  </span><span style="color:#6A737D;">//  フォントウェイト</span></span>
<span class="line"><span style="color:#E1E4E8;">  size: </span><span style="color:#79B8FF;">15</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> label </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Label</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">,      </span><span style="color:#6A737D;">// その他のプロパティ</span></span>
<span class="line"><span style="color:#E1E4E8;">  font: font,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text: </span><span style="color:#9ECBFF;">&quot;Hello World!&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">scene.</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(label);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> font </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">DynamicFont</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  game: g.game,</span></span>
<span class="line"><span style="color:#24292E;">  fontFamily: </span><span style="color:#032F62;">&quot;sans-serif&quot;</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;">// フォントファミリ</span></span>
<span class="line"><span style="color:#24292E;">  fontWeight: </span><span style="color:#032F62;">&quot;bold&quot;</span><span style="color:#24292E;">,  </span><span style="color:#6A737D;">//  フォントウェイト</span></span>
<span class="line"><span style="color:#24292E;">  size: </span><span style="color:#005CC5;">15</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> label </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Label</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">,      </span><span style="color:#6A737D;">// その他のプロパティ</span></span>
<span class="line"><span style="color:#24292E;">  font: font,</span></span>
<span class="line"><span style="color:#24292E;">  text: </span><span style="color:#032F62;">&quot;Hello World!&quot;</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">scene.</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(label);</span></span></code></pre></div><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツは、 太字指定ありとなしの <code>Label</code> を表示しています。</p>`,6),r=s('<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>太字にするには <code>g.DynamicFont</code> の <code>fontWeight</code> プロパティで <code>&quot;bold&quot;</code> を指定します。 省略時には通常ウェイトの <code>&quot;normal&quot;</code> が指定されます。 <code>fontWeight</code> は参照のためにのみ公開されているので、<code>g.DynamicFont</code> を生成後に値を変更することはできません。</p><p>生成後の値は、 <code>fontWeight</code> プロパティで参照できます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">font.fontWeight; </span><span style="color:#6A737D;">// =&gt; &quot;bold&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">font.fontWeight; </span><span style="color:#6A737D;">// =&gt; &quot;bold&quot;</span></span></code></pre></div><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/text.html">チュートリアル</a></li><li><a href="/akashic-engine/v3/classes/DynamicFont.html#fontWeight">API リファレンス</a></li></ul>',6);function i(E,y,d,h,u,g){const a=o("PlaygroundElement");return e(),l("div",null,[c,p(a,{gameJsonUri:"/snippets/reverse-reference/text/bold/game.json",width:600,height:400}),r])}const m=n(t,[["render",i]]);export{f as __pageData,m as default};