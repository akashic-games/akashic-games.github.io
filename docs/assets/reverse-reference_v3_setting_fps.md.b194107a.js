import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.459ab1e9.js";const u=JSON.parse('{"title":"FPS を変える","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/setting/fps.md","filePath":"reverse-reference/v3/setting/fps.md"}'),o={name:"reverse-reference/v3/setting/fps.md"},l=e(`<h1 id="fps-を変える" tabindex="-1">FPS を変える <a class="header-anchor" href="#fps-を変える" aria-label="Permalink to &quot;FPS を変える&quot;">​</a></h1><p>FPS を変えるには、<code>game.json</code> の <code>fps</code> プロパティの値を変更します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;width&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1280</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;height&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">720</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;fps&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FDAEB7;font-style:italic;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;width&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1280</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;height&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">720</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;fps&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#B31D28;font-style:italic;">...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p><code>game.json</code> の <code>fps</code> プロパティの値を変更することで FPS を変更することができます。</p><p>FPS の値は 1 秒間に画面を更新する回数です。値は 1 以上 60 以下 が指定可能です。(30 または 60 を推奨しています)</p><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/reference/manifest/game-json.html">game.json の仕様</a></li></ul>`,9),p=[l];function t(c,r,i,E,d,y){return a(),n("div",null,p)}const f=s(o,[["render",t]]);export{u as __pageData,f as default};