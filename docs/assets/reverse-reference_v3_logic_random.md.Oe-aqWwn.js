import{_ as i,c as t,I as s,a3 as a,o,E as n}from"./chunks/framework.DaCD_bki.js";const E=JSON.parse('{"title":"乱数を使う","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/logic/random.md","filePath":"reverse-reference/v3/logic/random.md"}'),r={name:"reverse-reference/v3/logic/random.md"},d=a('<h1 id="乱数を使う" tabindex="-1">乱数を使う <a class="header-anchor" href="#乱数を使う" aria-label="Permalink to &quot;乱数を使う&quot;">​</a></h1><p>乱数を使うには <code>g.game.random</code> を利用します。(<code>Math.random()</code> は原則利用しないでください。)</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">g.game.random.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 0 以上 1 未満の数値をランダムに返す</span></span></code></pre></div><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツは、矩形を格子状に並べるプログラムです。ただし矩形の色は 4 種類の色の中からランダムに選んで決めています</p>',6),l=a('<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p><code>g.game.random</code> は JavaScript の標準にある <code>Math.random()</code> と同じ機能ですが、Akashic Engine のゲームでは原則 <code>g.game.random</code> を利用してください。</p><p><code>Math.random()</code> を利用すると、その結果は実行環境(ブラウザウィンドウ)ごとに異なるので、同じイベントを与えても同じ状態が再現されなくなってしまいます。 <code>g.game.random</code> は一つのゲームプレイ内で全員が同じ乱数シードと乱数生成アルゴリズムを使うように作られているので、この問題がありません。 このことは特にマルチプレイの場合に重要です。詳細は <a href="/tutorial/v3/multiplay/introduction.html">マルチプレイの基礎</a> を参照してください。</p><p><code>generate()</code> は実数を返しますが、整数の乱数が必要なことも多いでしょう。0 以上 x 未満の整数は、 <code>generate()</code> を使って次のように生成できます。このコードでは、 <code>generate()</code> の戻り値を x 倍することで「0 以上 x 未満の実数」にし、 そこから <code>Math.floor()</code> で小数点以下を切り捨てて「0 以上 x 未満の整数」にしています。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Math.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">floor</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(g.game.random.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x);</span></span></code></pre></div><p>なお、意図的にプレイヤーごとに異なる乱数を生成したい場合は、 <a href="./local-random.html"><code>g.game.localRandom</code></a> を利用してください。</p><h3 id="例外-ランキングモードのニコ生ゲームの場合" tabindex="-1">例外: ランキングモードのニコ生ゲームの場合 <a class="header-anchor" href="#例外-ランキングモードのニコ生ゲームの場合" aria-label="Permalink to &quot;例外: ランキングモードのニコ生ゲームの場合&quot;">​</a></h3><p>ランキングモードのニコ生ゲームの場合、ゲームの実行方法が特殊なため、 <code>g.game.random</code> と <code>g.game.localRandom</code> どちらでも「プレイヤーごとに異なる乱数」が生成されてしまいます。 ランキングに参加するプレイヤー全員の間で共通の乱数を使うには、<a href="/shin-ichiba/ranking/ranking-by-template.html#random">ニコ生ゲームを作ろう » ランキングゲームテンプレートの &quot;共通乱数生成器&quot;</a> を参照してください。</p><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/animation.html#random-number">チュートリアル</a></li><li><a href="https://akashic-games.github.io/akashic-engine/v3/classes/Game.html#random" target="_blank" rel="noreferrer">API リファレンス</a></li></ul>',10);function h(c,p,m,g,k,_){const e=n("PlaygroundElement");return o(),t("div",null,[d,s(e,{gameJsonUri:"/snippets/tutorial-animation-5/game.json",width:600,height:400}),l])}const b=i(r,[["render",h]]);export{E as __pageData,b as default};