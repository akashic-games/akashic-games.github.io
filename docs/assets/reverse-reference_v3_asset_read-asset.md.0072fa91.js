import{_ as s,o as a,c as e,Q as o}from"./chunks/framework.459ab1e9.js";const u=JSON.parse('{"title":"アセットを読み込む","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/asset/read-asset.md","filePath":"reverse-reference/v3/asset/read-asset.md"}'),n={name:"reverse-reference/v3/asset/read-asset.md"},t=o(`<h1 id="アセットを読み込む" tabindex="-1">アセットを読み込む <a class="header-anchor" href="#アセットを読み込む" aria-label="Permalink to &quot;アセットを読み込む&quot;">​</a></h1><p>アセットを読み込むには、シーンの生成時に <code>assetPaths</code> プロパティにファイルパスで読み込むアセットを指定することができます。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> scene </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Scene</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  game: g.game,</span></span>
<span class="line"><span style="color:#E1E4E8;">  assetPaths: [</span><span style="color:#9ECBFF;">&quot;/image/character01.png&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;/assets/**/*&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> scene </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Scene</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  game: g.game,</span></span>
<span class="line"><span style="color:#24292E;">  assetPaths: [</span><span style="color:#032F62;">&quot;/image/character01.png&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;/assets/**/*&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>シーンの生成時に、<code>assetPaths</code> プロパティで利用するアセットのファイルパスを指定することによりアセットが読み込まれます。 ファイルパスは、 <code>game.json</code> のあるディレクトリをルート (<code>/</code>) とする スラッシュ区切りの絶対パスです。</p><p><code>assetPaths</code> には glob のサブセット文法(<code>**</code>, <code>*</code>, <code>?</code>) を利用することができます。</p><ul><li><code>**</code>: 0 個以上の任意の名前のディレクトリ名</li><li><code>*</code>: 任意のディレクトリ名またはファイル名</li><li><code>?</code>: 任意の 1 文字</li></ul><p>たとえば <code>assets/</code> ディレクトリに次のようにアセットが置かれている時、</p><ul><li>/assets/scenarios/scenario1.txt</li><li>/assets/scenarios/scenario2.txt</li><li>/assets/scenarios/scenario3.txt</li><li>/assets/image/payer.png</li><li>/assets/map.json</li></ul><p><code>&quot;/assets/**/*&quot;</code> を指定するとこの全てが読み込まれます。 <code>&quot;/assets/scenarios/scenario?.txt</code> を指定すると <code>scenario1.txt</code>, <code>scenario2.txt</code>, <code>scenario3.txt</code> が読み込まれます。</p><h3 id="id-による指定" tabindex="-1">ID による指定 <a class="header-anchor" href="#id-による指定" aria-label="Permalink to &quot;ID による指定&quot;">​</a></h3><p>また、<code>assetIds</code> プロパティにアセットの ID を指定し読み込むこともできます。Akashic Engine v2 以前ではアセットを読み込む唯一の方法でした。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> scene </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Scene</span><span style="color:#E1E4E8;">({ game: g.game, assetIds: [</span><span style="color:#9ECBFF;">&quot;player&quot;</span><span style="color:#E1E4E8;">] });</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> scene </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Scene</span><span style="color:#24292E;">({ game: g.game, assetIds: [</span><span style="color:#032F62;">&quot;player&quot;</span><span style="color:#24292E;">] });</span></span></code></pre></div><p><code>assetIds</code> の利用では、ファイル名が重複するとトラブルの原因になりますので注意してください。 たとえば <code>image/player.png</code> と <code>text/player.json</code> があると、 <code>akashic scan</code> コマンドが同じアセット ID で登録しようとしてエラーになります。</p><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/assetPaths.html#asset-paths">複数アセットをまとめて扱う</a></li></ul>`,17),l=[t];function c(p,r,i,d,E,y){return a(),e("div",null,l)}const g=s(n,[["render",c]]);export{u as __pageData,g as default};