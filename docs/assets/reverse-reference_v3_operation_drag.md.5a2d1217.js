import{_ as e,C as n,o,c as t,H as l,Q as s}from"./chunks/framework.459ab1e9.js";const u=JSON.parse('{"title":"ドラッグ・スワイプで動かす","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/operation/drag.md","filePath":"reverse-reference/v3/operation/drag.md"}'),p={name:"reverse-reference/v3/operation/drag.md"},c=s(`<h1 id="ドラッグ・スワイプで動かす" tabindex="-1">ドラッグ・スワイプで動かす <a class="header-anchor" href="#ドラッグ・スワイプで動かす" aria-label="Permalink to &quot;ドラッグ・スワイプで動かす&quot;">​</a></h1><p>エンティティをドラッグ・スワイプできるようにするには、<code>onPointMove</code> トリガーを利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> rect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">FilledRect</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">,      </span><span style="color:#6A737D;">// その他のプロパティ</span></span>
<span class="line"><span style="color:#E1E4E8;">  touchable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 触れられるオブジェクトにする</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">rect.onPointMove.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// エンティティがドラッグク・スワイプされた時の処理</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> rect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">FilledRect</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">,      </span><span style="color:#6A737D;">// その他のプロパティ</span></span>
<span class="line"><span style="color:#24292E;">  touchable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 触れられるオブジェクトにする</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">rect.onPointMove.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// エンティティがドラッグク・スワイプされた時の処理</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>エンティティは <code>touchable</code> プロパティを <code>true</code> にすることにより、タップやクリックなどのユーザ操作を検出できるようになります。</p><p>エンティティをクリック・タップするには <a href="./click.html"><code>g.E#onPointDown</code> を利用してください。</a></p><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツは、矩形をドラッグ・スワイプすると矩形が移動します。</p>`,8),r=s(`<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>Akashic Engine ではユーザがタップやクリックするとポイントイベントが発生します。ポイントイベントを受け取るトリガーには以下の 3 種類があります。</p><table><thead><tr><th style="text-align:center;">トリガー名</th><th style="text-align:left;">内容</th></tr></thead><tbody><tr><td style="text-align:center;"><code>onPointDown</code></td><td style="text-align:left;">画面に指が触れた。マウスのボタンが押された</td></tr><tr><td style="text-align:center;"><code>onPointMove</code></td><td style="text-align:left;">画面に触れた指が移動した。ボタンが押された状態でマウスが移動した</td></tr><tr><td style="text-align:center;"><code>onPointUp</code></td><td style="text-align:left;">画面から指が離れた。マウスのボタンが離された</td></tr></tbody></table><p>それぞれのイベントに対応するトリガーを利用することで、イベント発生時に処理を実行できます。</p><p>下記コードの <code>onPointMove</code> トリガーに渡した関数の引数 <code>ev</code> にポイントイベントが与えられています。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">rect.onPointMove.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">ev</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.x </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> ev.prevDelta.x;</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.y </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> ev.prevDelta.y;</span></span>
<span class="line"><span style="color:#E1E4E8;">  rect.</span><span style="color:#B392F0;">modified</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">rect.onPointMove.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">ev</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  rect.x </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> ev.prevDelta.x;</span></span>
<span class="line"><span style="color:#24292E;">  rect.y </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> ev.prevDelta.y;</span></span>
<span class="line"><span style="color:#24292E;">  rect.</span><span style="color:#6F42C1;">modified</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>この変数には下記のプロパティがあります。</p><table><thead><tr><th style="text-align:center;">プロパティ</th><th style="text-align:left;">意味</th></tr></thead><tbody><tr><td style="text-align:center;"><code>ev.point.x</code>,<br><code>ev.point.y</code></td><td style="text-align:left;">最後に<code>onPointDown</code>が発生した座標。座標系の原点はエンティティの座標</td></tr><tr><td style="text-align:center;"><code>ev.startDelta.x</code>,<br><code>ev.startDelta.y</code></td><td style="text-align:left;">最後に<code>onPointDown</code>が発生した座標から、現在のポイント座標までの移動量。ただし<code>onPointDown</code>イベントでは利用できない</td></tr><tr><td style="text-align:center;"><code>ev.prevDelta.x</code>,<br><code>ev.prevDelta.y</code></td><td style="text-align:left;">最後に<code>onPointMove</code>が発生した座標から、現在のポイント座標までの移動量。ただし<code>onPointDown</code>イベントでは利用できない</td></tr></tbody></table><p>ただしドラッグするエンティティの祖先エンティティが拡大・回転されていると、ドラッグに追従して動かすことは難しくなります。 (行列計算による座標系の変換が必要になります)</p><p>簡単のため、ドラッグするエンティティやその祖先は拡大・回転しないことを推奨します。</p><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/click.html">チュートリアル</a></li><li><a href="/akashic-engine/v3/classes/E.html#onPointMove">API リファレンス</a></li></ul>`,12);function i(d,y,E,h,v,g){const a=n("PlaygroundElement");return o(),t("div",null,[c,l(a,{gameJsonUri:"/snippets/reverse-reference/operation/drag/game.json",width:600,height:400}),r])}const f=e(p,[["render",i]]);export{u as __pageData,f as default};