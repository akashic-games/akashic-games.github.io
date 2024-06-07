import{_ as n,C as l,o as e,c as p,H as o,Q as s}from"./chunks/framework.f1c0562b.js";const q=JSON.parse('{"title":"シーン内で動的にアセットを読み込む","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/asset/request-asset.md","filePath":"reverse-reference/v3/asset/request-asset.md"}'),t={name:"reverse-reference/v3/asset/request-asset.md"},c=s(`<h1 id="シーン内で動的にアセットを読み込む" tabindex="-1">シーン内で動的にアセットを読み込む <a class="header-anchor" href="#シーン内で動的にアセットを読み込む" aria-label="Permalink to &quot;シーン内で動的にアセットを読み込む&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>セキュリティ上の制約から、ユーザ投稿ニコ生ゲームではでゲーム外のアセットを読み込むことができません。</p></div><p>シーン内で動的にアセットを読み込むには、<code>g.Scene#requestAssets()</code> を利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">scene.</span><span style="color:#B392F0;">requestAssets</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 読み込む対象</span></span>
<span class="line"><span style="color:#E1E4E8;">    assetIds: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        id: </span><span style="color:#9ECBFF;">&quot;textData&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        uri: </span><span style="color:#9ECBFF;">&quot;./text/data.json&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        type: </span><span style="color:#9ECBFF;">&quot;text&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// エラー発生時にエラーをコールバックで受け取るか。true を推奨 (後述)</span></span>
<span class="line"><span style="color:#E1E4E8;">    notifyErrorOnCallback: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 完了時に呼び出されるコールバック</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (err) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 読み込み失敗時の処理</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 読み込み成功時は scene のアセットとしてアクセス可能になっている</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">textData</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scene.asset.</span><span style="color:#B392F0;">getTextById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;textData&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">scene.</span><span style="color:#6F42C1;">requestAssets</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 読み込む対象</span></span>
<span class="line"><span style="color:#24292E;">    assetIds: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        id: </span><span style="color:#032F62;">&quot;textData&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        uri: </span><span style="color:#032F62;">&quot;./text/data.json&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        type: </span><span style="color:#032F62;">&quot;text&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// エラー発生時にエラーをコールバックで受け取るか。true を推奨 (後述)</span></span>
<span class="line"><span style="color:#24292E;">    notifyErrorOnCallback: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 完了時に呼び出されるコールバック</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (err) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 読み込み失敗時の処理</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 読み込み成功時は scene のアセットとしてアクセス可能になっている</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">textData</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scene.asset.</span><span style="color:#6F42C1;">getTextById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;textData&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツは、一度だけ画面をクリックした場所に画像を動的に読み込み表示します。</p>`,7),r=s(`<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>シーン内で動的にアセットを読み込むには <code>g.Scene#requestAssets()</code> を利用します。読み込むアセットは <code>game.json</code> に登録されている必要はありません。 この関数はシーンの読み込み完了前には呼び出すことが出来ない点に注意してください。</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>コンテンツと異なるサーバにあるアセットを読み込む場合は、オリジン間リソース共有 (CORS) でエラーとなる場合があるので注意してください。 またセキュリティ上の制限により、 <strong>ユーザ投稿ニコ生ゲームではこの機能で外部のアセットを取得することができません。</strong></p></div><h3 id="読み込み失敗の検出" tabindex="-1">読み込み失敗の検出 <a class="header-anchor" href="#読み込み失敗の検出" aria-label="Permalink to &quot;読み込み失敗の検出&quot;">​</a></h3><p>凡例のコードのように <code>notifyErrorOnCallback</code> に真を指定した場合、読み込み失敗時にはコールバックの引数としてエラーが与えられます。 特に理由がなければ、この方法でエラーを受け取ることを推奨します。</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p><code>notifyErrorOnCallback</code> が偽の場合、コールバックには引数は与えられません。</p><p>アセット読み込み失敗の検出には <code>g.Scene#onAssetLoadFailure</code> トリガーを利用します。 このトリガーはシーンのアセットが一つ読み込みに失敗する度に fire されます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">scene.onAssetLoadFailure.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">failureInfo</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// エラー時の処理</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">scene.onAssetLoadFailure.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">failureInfo</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// エラー時の処理</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div></div><div class="info custom-block"><p class="custom-block-title">互換性のための補足</p><p><code>notifyErrorOnCallback</code> オプションは Akashic Engine v3.16.5 で追加されました。 それ以前のバージョンでは、偽を指定したのと同じ振る舞いをします。 また <code>requestAssets()</code> の第一引数は、凡例のコードの <code>assetIds</code> にあたる配列だけを受け取っていました。 この呼び出し方法は現在も利用可能です。</p></div><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/akashic-engine/v3/classes/Scene.html#requestAssets">API リファレンス</a></li></ul>`,9);function E(i,y,d,u,h,_){const a=l("PlaygroundElement");return e(),p("div",null,[c,o(a,{gameJsonUri:"/snippets/reverse-reference/asset/request-asset/game.json",width:600,height:400}),r])}const f=n(t,[["render",E]]);export{q as __pageData,f as default};
