import{_ as a,C as n,o,c as l,H as t,Q as c,k as e,a as p}from"./chunks/framework.459ab1e9.js";const _=JSON.parse('{"title":"早送り中の描画を変更する","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/setting/skipping-scene.md","filePath":"reverse-reference/v3/setting/skipping-scene.md"}'),i={name:"reverse-reference/v3/setting/skipping-scene.md"},r=c(`<h1 id="早送り中の描画を変更する" tabindex="-1">早送り中の描画を変更する <a class="header-anchor" href="#早送り中の描画を変更する" aria-label="Permalink to &quot;早送り中の描画を変更する&quot;">​</a></h1><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><h3 id="組み込みの早送り表示を利用する" tabindex="-1">組み込みの早送り表示を利用する <a class="header-anchor" href="#組み込みの早送り表示を利用する" aria-label="Permalink to &quot;組み込みの早送り表示を利用する&quot;">​</a></h3><p><code>game.json</code> の <code>defaultSkippingScene</code> プロパティの値を変更します。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#FDAEB7;font-style:italic;">...,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;defaultSkippingScene&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;indicator&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#B31D28;font-style:italic;">...,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;defaultSkippingScene&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;indicator&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="早送り中の表示をカスタマイズする" tabindex="-1">早送り中の表示をカスタマイズする <a class="header-anchor" href="#早送り中の表示をカスタマイズする" aria-label="Permalink to &quot;早送り中の表示をカスタマイズする&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> skippingScene </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 早送り中に表示したいシーン</span></span>
<span class="line"><span style="color:#E1E4E8;">g.game.skippingScene </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> skippingScene;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> skippingScene </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 早送り中に表示したいシーン</span></span>
<span class="line"><span style="color:#24292E;">g.game.skippingScene </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> skippingScene;</span></span></code></pre></div><h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p><code>game.json</code> の <code>defaultSkippingScene</code> プロパティの値を変更することで早送り中の表示を変更することができます。</p><ul><li><code>&quot;fast-forward&quot;</code> を指定、または省略した場合は早送り中のゲーム状態をそのまま描画します。</li><li><code>&quot;indicator&quot;</code> を指定すると早送り中にエンジンで用意されている専用のスキッピングシーンを描画します。</li><li><code>&quot;none&quot;</code> を指定すると早送り中の描画内容を非表示にできます。</li></ul><p>または <code>g.game.skippingScene</code> に独自のシーンを代入することで描画内容をカスタマイズできます。 この際、代入できるシーンには以下の制約があります。</p><ul><li>使用できるのは <code>local</code> が <code>&quot;full-local&quot;</code> のシーンのみ</li><li>非グローバルアセットは利用不可 <ul><li>アセットを利用する場合はグローバルで定義しておく必要があります。アセットについての詳細は <a href="/reference/manifest/game-json.html">こちらのページ</a> を参照してください。</li></ul></li><li>スキッピングシーンのインスタンス生成は一度のみで、早送りが発生するたびに使い回される <ul><li>したがって <code>g.Scene#onLoad</code> は一度しか発火しません。</li></ul></li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>実装の制約上、グローバルアセットの読み込み時間や <code>g.game.skippingScene</code> への代入までは上記の組み込みの描画が適用されます。 また <code>g.game.skippingScene</code> に <code>undefined</code> を代入することで組み込みの描画へと切り替えることができます。</p></div><h2 id="実装例" tabindex="-1">実装例 <a class="header-anchor" href="#実装例" aria-label="Permalink to &quot;実装例&quot;">​</a></h2><p>早送り中に <code>&quot;読み込み中...&quot;</code> という文字を画面中央に表示するサンプル</p><div class="info custom-block"><p class="custom-block-title">NOTE</p><p>このサンプルはスタンドアロンモードで実行されているため、早送り中の描画を確認することは難しいでしょう。 画面内のボタンからコンテンツをダウンロード後、 <code>akashic serve</code> コマンドを実行することで早送りの表示を確認することができます。</p></div>`,16),d=e("h2",{id:"関連情報",tabindex:"-1"},[p("関連情報 "),e("a",{class:"header-anchor",href:"#関連情報","aria-label":'Permalink to "関連情報"'},"​")],-1),u=e("ul",null,[e("li",null,[e("a",{href:"/reference/manifest/game-json.html"},"game.json の仕様")])],-1);function h(g,E,y,m,k,f){const s=n("PlaygroundElement");return o(),l("div",null,[r,t(s,{gameJsonUri:"/snippets/reverse-reference/setting/skipping-scene/game.json",width:600,height:400}),d,u])}const q=a(i,[["render",h]]);export{_ as __pageData,q as default};