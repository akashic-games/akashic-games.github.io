import{_ as a,c as e,o as s,a3 as i}from"./chunks/framework.DaCD_bki.js";const F=JSON.parse('{"title":"ゲームからアセットを削除する","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/asset/remove-asset.md","filePath":"reverse-reference/v3/asset/remove-asset.md"}'),t={name:"reverse-reference/v3/asset/remove-asset.md"},n=i(`<h1 id="ゲームからアセットを削除する" tabindex="-1">ゲームからアセットを削除する <a class="header-anchor" href="#ゲームからアセットを削除する" aria-label="Permalink to &quot;ゲームからアセットを削除する&quot;">​</a></h1><p>ゲームからアセットを削除するには、対象のファイルを削除後 <code>akashic scan asset</code> コマンドを実行します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">akashic</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> scan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> asset</span></span></code></pre></div><p>ゲームにアセットを追加する方法は <a href="./add-asset.html">こちら</a> を参照してください。</p><h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>アセットを削除するには、対象のファイルを削除後に <code>akashic scan asset</code> コマンドを実行します。</p><p><code>akashic scan asset</code> コマンドを実行すると、上記のディレクトリ内に新しいファイルが見つかった場合は <code>game.json</code> に登録し、ディレクトリからファイルが削除された場合は <code>game.json</code> から登録を解除します。</p><p>画像ファイルの <code>player.png</code> を削除し <code>akashic scan asset</code> コマンドを実行すると、画面に以下のように表示されます。 <code>akashic scan asset</code> コマンドにより <code>game.json</code> から対象となるアセットの登録を解除されます。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">INFO:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Removed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> the</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> declaration</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;player&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (image/player.png). The correspondig files to the path are not found.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">INFO:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Done!</span></span></code></pre></div><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/basic.html#image">画像を扱う</a></li><li><a href="/reference/tool/akashic-cli/scan.html">akashic-cli</a></li></ul>`,12),h=[n];function o(l,c,r,d,p,k){return s(),e("div",null,h)}const m=a(t,[["render",o]]);export{F as __pageData,m as default};