import{_ as a,c as e,o as n,a3 as s}from"./chunks/framework.DaCD_bki.js";const p="/assets/performance1.C8UZmt93.png",t="/assets/performance2.rqPsDwuO.png",o="/assets/performance3.DjAEgE-0.png",_=JSON.parse('{"title":"高速化 TIPS","description":"","frontmatter":{"outline":[2,3]},"headers":[],"relativePath":"tips/acceleration-tips.md","filePath":"tips/acceleration-tips.md"}'),c={name:"tips/acceleration-tips.md"},i=s(`<h1 id="高速化-tips" tabindex="-1">高速化 TIPS <a class="header-anchor" href="#高速化-tips" aria-label="Permalink to &quot;高速化 TIPS&quot;">​</a></h1><h2 id="これは" tabindex="-1">これは <a class="header-anchor" href="#これは" aria-label="Permalink to &quot;これは&quot;">​</a></h2><p>ゲームの動作を高速化するための検討材料について記述したドキュメントです。 Akashic Engine で開発されたコンテンツに適用できる高速化手法について記述します。</p><h2 id="描画の高速化" tabindex="-1">描画の高速化 <a class="header-anchor" href="#描画の高速化" aria-label="Permalink to &quot;描画の高速化&quot;">​</a></h2><h3 id="pane" tabindex="-1">g.Pane の利用箇所を減らす <a class="header-anchor" href="#pane" aria-label="Permalink to &quot;g.Pane の利用箇所を減らす {#pane}&quot;">​</a></h3><p><code>g.Pane</code> は Akashic のゲームに様々な描画効果を与えることができますが、できるだけ利用箇所を減らすほうが動作は軽くなります。<code>g.Pane</code> は内部に描画キャッシュを持ち、描画内容が更新されるたびにキャッシュを更新するためです。 この更新は、 <code>g.Pane</code> 自身には更新が無くとも、子要素が更新された場合にも必要です。頻繁に更新されるエンティティの親や祖先に <code>g.Pane</code> がある場合、頻繁に <code>g.Pane</code> のキャッシュ再描画が必要になります。 もし、ゲーム内で利用している <code>g.Pane</code> が <code>g.E</code> でも賄える場合、 <code>g.E</code> へ変更することで、負荷を減らすことができます。 特に、 <code>g.Pane</code> をグループ化の用途のみに使っていて、 <code>CompositeOperation</code> <code>shaerProgram</code> の指定がなく、子孫要素が <code>g.Pane</code> のサイズをはみ出ない場合は、 <code>g.E</code> での代替を検討するべきです。</p><h3 id="update" tabindex="-1">エンティティの更新頻度 <a class="header-anchor" href="#update" aria-label="Permalink to &quot;エンティティの更新頻度 {#update}&quot;">​</a></h3><p><code>modified()</code> や <code>invalidate()</code> の呼ばれたエンティティはいずれも更新され、再描画されます。 再描画には一定のコストがかかるため、演出上妥協できる場合は、これらのメソッドを呼ぶ回数を減らすことで、負荷を低減することができます。</p><h3 id="camera" tabindex="-1">カメラ外の描画 <a class="header-anchor" href="#camera" aria-label="Permalink to &quot;カメラ外の描画 {#camera}&quot;">​</a></h3><p>ゲーム内の空間が広く、ゲーム画面に収まりきらないほど大きい場合、画面外の要素は描画しても画面に反映されません。 画面外要素のドローコールを省略することで、描画にかかるゲーム全体の負荷を低減できる場合があります。 エンティティが画面に入っているかは、<code>g.Camera</code> でゲーム画面の描画位置を制御している場合、そのカメラの位置・ゲーム画面のサイズ・エンティティの位置と座標から判定することができます。</p><p>画面の内外を判定する処理は単純ではありませんが、たとえば次のような条件を満たす場合は、以下のコードで描画を省略させることができます。</p><ul><li>カメラの回転や拡大縮小がない</li><li>各エンティティの描画される範囲が、親エンティティの矩形の範囲をほとんどはみ出さない</li><li>描画中のエンティティの回転や拡大縮小による描画範囲の変化が <code>margin</code> の範囲に収まる</li></ul><p>例として、以下のようなメソッドを <code>g.E</code> の派生クラスに定義する（オーバーライド）ことで、その派生クラスのエンティティの画面外での描画を省略することができます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>render(renderer: g.Renderer, camera?: g.Camera): void {</span></span>
<span class="line"><span>	if (camera) {</span></span>
<span class="line"><span>		const margin = 50;</span></span>
<span class="line"><span>		const globalOffset = this.localToGlobal(this);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		if (</span></span>
<span class="line"><span>			globalOffset.x &gt;= camera.x - margin &amp;&amp;</span></span>
<span class="line"><span>			globalOffset.x &lt;= camera.x + g.game.width + margin &amp;&amp;</span></span>
<span class="line"><span>			globalOffset.y &gt;= camera.y - margin &amp;&amp;</span></span>
<span class="line"><span>			globalOffset.y &lt;= camera.y + g.game.height + margin</span></span>
<span class="line"><span>		) {</span></span>
<span class="line"><span>			super.render(renderer, camera);</span></span>
<span class="line"><span>		} else {</span></span>
<span class="line"><span>			return;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="dynamicfont" tabindex="-1">DynamicFont の生成 <a class="header-anchor" href="#dynamicfont" aria-label="Permalink to &quot;DynamicFont の生成 {#dynamicfont}&quot;">​</a></h3><p>Akashic のゲームで文字列を表示する方法の一つとして、ダイナミックフォントがあります。 ダイナミックフォントはグリフのラスタライズ結果をキャッシュしており、一度描画したグリフを保持することで、二度目以降の描画を効率的に行います。 一度目の描画はグリフをラスタライズする必要があるので、二度目以降の描画よりも描画のコストが高くなります。 つまり、初めて描画するグリフを多く含む文字列を描画する場合、瞬間的に通常よりも多くの負荷がかかります。</p><p>この対策として、 <code>g.DynamicFont</code> は、生成時にフォント生成のヒント情報を与えることができます。 ヒント情報には、予めキャッシュを生成する文字のセットや、キャッシュを描画するテクスチャアトラスのサイズを指定することができます。 例えば、 <code>g.DynamicFont</code> を以下のように生成することで、0 ～ 9 のグリフのキャッシュを持ったダイナミックフォントを生成できます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const font = new g.DynamicFont({</span></span>
<span class="line"><span>    game: g.game,</span></span>
<span class="line"><span>    fontFamily: g.FontFamily.Serif,</span></span>
<span class="line"><span>    size: 48,</span></span>
<span class="line"><span>    hint: {</span></span>
<span class="line"><span>      presetChars: &quot;0123456789&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>});</span></span></code></pre></div><h2 id="その他" tabindex="-1">その他 <a class="header-anchor" href="#その他" aria-label="Permalink to &quot;その他&quot;">​</a></h2><h3 id="profiler" tabindex="-1">高負荷な処理を探す方法 <a class="header-anchor" href="#profiler" aria-label="Permalink to &quot;高負荷な処理を探す方法 {#profiler}&quot;">​</a></h3><p>Akashic ゲームに限らず、作成したゲームの挙動が明らかに重い場合、ゲーム処理のどこかに高い負荷があることが推測されます。これを解決するには、何が高負荷な処理なのか見つける必要があります。 主要なブラウザのプロファイラ機能は、このような調査をする際に有効なツールです。（ここでは例として Google Chrome を用います）</p><p>プロファイラは F12 キーで開くことができます。プロファイラの詳しい使い方は下記 URL を参考にしてください。 <a href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool?hl=ja" target="_blank" rel="noreferrer">https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool?hl=ja</a></p><p>プロファイラは、実行中の JavaScript の実行状態を記録します。例として、ある Akashic ゲームの記録は以下のようになります。</p><p><img src="`+p+'" alt="performance1"></p><p>このグラフは多くの箇所に赤い印がついており、高負荷を示しています。 これを拡大すると、何の処理にどの程度の時間をかけたかがグラフで図示されます。</p><p><img src="'+t+'" alt="performance2"></p><p>この図では、 <code>E.render</code> が大きな比率を占めていることから、描画による負荷が大きいことが分かります。個別のグラフを拡大すると、より細かい負荷配分を見ることができます。</p><p><img src="'+o+'" alt="performance3"></p><p>描画による負荷であれば、描画回数を減らす（≒ <code>modified()</code> 呼び出し頻度を下げる）などの対策が考えられます。また、描画に関係のない負荷であれば、計算を簡略化するなどが対策の候補になります。</p>',29),l=[i];function r(d,h,m,g,f,u){return n(),e("div",null,l)}const P=a(c,[["render",r]]);export{_ as __pageData,P as default};