import{_ as a,c as e,o,a3 as s}from"./chunks/framework.DaCD_bki.js";const g=JSON.parse('{"title":"よくある落とし穴","description":"","frontmatter":{},"headers":[],"relativePath":"tips/common-pitfalls.md","filePath":"tips/common-pitfalls.md"}'),n={name:"tips/common-pitfalls.md"},c=s(`<h1 id="よくある落とし穴" tabindex="-1">よくある落とし穴 <a class="header-anchor" href="#よくある落とし穴" aria-label="Permalink to &quot;よくある落とし穴&quot;">​</a></h1><h2 id="これは" tabindex="-1">これは <a class="header-anchor" href="#これは" aria-label="Permalink to &quot;これは {#これは}&quot;">​</a></h2><p>Akashic Engine でゲームを開発する際の、よくある落とし穴をまとめます。</p><p>Akashic ゲームでマルチプレイやリプレイを実現するには、「同じコードが同じ入力に対して同じ動作をする」必要があります。環境が異なっても、実行日時が違っても、同じ動作でなければなりません。</p><p>なぜなら、Akashic Engine は「ユーザの操作」を共有することで間接的にゲームの実行状態を同期・共有するためです。同じ操作に対する動作にばらつきがあると、リプレイを見るたびにゲームのスコアが変わってしまったり、マルチプレイのプレイヤー間でゲームの状態が食い違ってしまうといった問題が生じます。</p><p>JavaScript の機能には、同じ呼び出しでも結果が異なりうるものが存在します。 Akashic Engine 自体は、それらの機能を意図的に使えなくするなどの制限は行なっていません。その種の機能を使う場合、注意深く利用する必要があります。</p><h2 id="現在時刻を使ってしまう" tabindex="-1">現在時刻を使ってしまう <a class="header-anchor" href="#現在時刻を使ってしまう" aria-label="Permalink to &quot;現在時刻を使ってしまう {#現在時刻を使ってしまう}&quot;">​</a></h2><p><code>Date.now()</code> や <code>new Date()</code> など、 <code>Date</code> 関連のいくつかの機能は「現在時刻」の情報を扱います。これらの実行結果は、当然ながら実行環境の時刻設定と呼び出されたタイミングに依存します。</p><p>Akashic ゲームでは、 <strong>現在時刻に依存してゲームの実行状態が変わらないようにしてください</strong> 。</p><p>例えば、自動生成のダンジョンを生成する時のシード情報として「現在時刻」を使ってしまうと、リプレイを後から見た時(違う時刻で実行した時)に異なるダンジョンが生成されてしまいます。ダンジョンが変わっても操作自体は最初のプレイのままなので、でたらめな操作が行われたようなリプレイになります。 (ランダムな値が必要な場合は、後述のとおり <code>g.Game#random</code> を利用してください。)</p><p>現在時刻を利用する場合は、あくまでも画面演出のためだけに使うなど、実行状態に影響しないよう注意してください。</p><p>なお Akashic Engine v2.3.6 以降では、試験的に <code>g.Game#getCurrentTime()</code> を導入しています。これは <code>Date.now()</code> と同じく 1970 年 1 月 1 日 0 時 0 分 0 秒(UTC)からの経過時刻(ミリ秒)を返す関数(ただし小数点以下を含む)です。 <code>Date.now()</code> と異なり、リプレイ時にも元のプレイ当時の時刻が再現されます。しかし、この関数もローディングシーンの時間に影響は受けるため、マルチプレイのプレイヤー間で一致する時刻情報としては利用できません。あくまで演出上のものとして扱う必要があります。</p><h2 id="Math.random()を使ってしまう" tabindex="-1">Math.random()を使ってしまう <a class="header-anchor" href="#Math.random()を使ってしまう" aria-label="Permalink to &quot;Math.random()を使ってしまう {#Math.random()を使ってしまう}&quot;">​</a></h2><p><code>Math.random()</code> は利用しないでください。 <code>Date.now()</code> 同様、リプレイを後から見た時に (生成される乱数が変わってしまうため) おかしくなってしまうためです。</p><p>代わりに、Akashic Engine が提供する乱数生成器 <code>g.Game#random</code> を利用してください。これは乱数シードとアルゴリズムが一つのプレイの中で統一された乱数生成器です。 Akashic Engine のプレイはこの乱数生成器のシードを記録に含めるため、 <code>g.Game#random</code> の生成結果はリプレイ時にも保たれます。</p><h2 id="g.Game#randomをローカル処理に使ってしまう" tabindex="-1">g.Game#random をローカル処理に使ってしまう <a class="header-anchor" href="#g.Game#randomをローカル処理に使ってしまう" aria-label="Permalink to &quot;g.Game#random をローカル処理に使ってしまう {#g.Game#randomをローカル処理に使ってしまう}&quot;">​</a></h2><p>ローカル処理では、 <code>g.Game#random</code> ではなく <code>g.Game#localRandom</code> を利用してください。</p><p>ローカル処理とは、「一人のプレイヤーの手元でしか発生しない処理」です。主に (ローカルエンティティをクリックした時に生じる) ローカルイベント起因の処理が該当します。ローカルイベントは「プレイヤー間で共有されない」「プレイとして記録に残らない」例外的なイベントであるため、一人のプレイヤーの手元でしか生じません。ここで <code>g.Game#random</code> を使ってしまうと、マルチプレイの他プレイヤーと乱数生成の系列がずれてしまいます。</p><p>イベントフィルタ機能 (<code>g.Game#addEventFilter()</code>) を使っている場合、イベントフィルタやそこから実行される処理もローカル処理です。それらの中でも <code>g.Game#random</code> を利用しないでください。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>なお <code>g.Game#localRandom</code> は Akashic Engine v3.0.0 で追加されました。 それ以前のバージョンでは <code>Math.random()</code> を利用してください。これは Akashic ゲームで <code>Math.random()</code> を利用すべき唯一のケースでした。v3 系以降、 <code>Math.random()</code> を利用すべき局面はなくなっています。</p></div><h2 id="@akashic/akashic-engineをrequire()/importしてしまう" tabindex="-1">@akashic/akashic-engine を require()/import してしまう <a class="header-anchor" href="#@akashic/akashic-engineをrequire()/importしてしまう" aria-label="Permalink to &quot;@akashic/akashic-engine を require()/import してしまう {#@akashic/akashic-engineをrequire()/importしてしまう}&quot;">​</a></h2><p>Akashic Engine のパッケージ <strong><code>&quot;@akashic/akashic-engine&quot;</code> を、スクリプトアセット内で <code>require()</code> しないでください</strong> 。</p><p>つまり、次のコードは(Akashic ゲームとしては)誤りです。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var g = require(&quot;@akashic/akashic-engine&quot;);</span></span></code></pre></div><p>TypeScript の場合の、次の記述も同様に誤りです。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import * as g from &quot;@akashic/akashic-engine&quot;;</span></span></code></pre></div><p>なぜなら、Akashic Engine の機能を提供する変数 <code>g</code> は、スクリプトアセット内では暗黙に存在するグローバル変数であるためです。変数 <code>g</code> は実行環境(akashic sandbox など)によって初期化され、スクリプトアセットに与えられます。ゲーム開発者が自力で <code>require()</code> してしまった場合、実行環境が与えるものとコンフリクトして正しく動作しない可能性があります。</p><p>基本的に、ゲーム開発者が明示的に <code>@akashic/akashic-engine</code> をインストールする必要はありません。</p><p>ただしゼロから TypeScript で開発する場合は、 <code>g</code> の型定義(d.ts ファイル)が必要になります。その場合は <code>npm install -DE @akashic/akashic-engine</code> を実行して(<code>devDependencies</code> として)Akashic Engine をインストールし、 <code>node_modules/@akashic/akashic-engine/lib/main.d.ts</code> をコンパイル対象に含めてください。</p><p><code>akashic init --type typescript</code> で生成される TypeScript 用テンプレートでは、最初から Akashic Engine の型定義ファイルがコンパイル対象に含まれているので、特別な対応は必要ありません。</p><h2 id="Array.prototype.sortの安定性を仮定してしまう" tabindex="-1">Array.prototype.sort の安定性を仮定してしまう <a class="header-anchor" href="#Array.prototype.sortの安定性を仮定してしまう" aria-label="Permalink to &quot;Array.prototype.sort の安定性を仮定してしまう {#Array.prototype.sortの安定性を仮定してしまう}&quot;">​</a></h2><p>ECMAScript の言語仕様上、 <code>Array.prototype.sort</code> が安定なソートであることは保証されていません。つまり、 <code>sort()</code> に与えられた比較関数が、ある二つの要素について <code>0</code> を返した時(等価であるとした時)、ソート後のそれらの順序は実装依存です。 (実際、あるバージョンの Safari と Chrome では <code>sort()</code> の結果が異なる場合があることが分かっています。)</p><p>例えば次のコードの実行結果は環境によって異なる可能性があります。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var a = { key: 1, value: &quot;foo&quot; };</span></span>
<span class="line"><span>var b = { key: 1, value: &quot;bar&quot; };</span></span>
<span class="line"><span>var c = { key: 1, value: &quot;zoo&quot; };</span></span>
<span class="line"><span>var d = { key: 2, value: &quot;the last&quot; };</span></span>
<span class="line"><span>var e = { key: 0, value: &quot;the first&quot; };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var array = [a, b, c, d, e];</span></span>
<span class="line"><span>array.sort(function (x, y) { return x.key - y.key; });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>console.log(array[0].value);  // ==&gt; &quot;the first&quot;</span></span>
<span class="line"><span>console.log(array[4].value);  // ==&gt; &quot;the last&quot;</span></span>
<span class="line"><span>console.log(array[1].value);  // ==&gt; &quot;foo&quot;, &quot;bar&quot; or &quot;zoo&quot; ???</span></span></code></pre></div><p>このコードは <code>array</code> の各要素を <code>key</code> プロパティの値の大小でソートするものです。 <code>sort()</code> の実行後、 <code>array</code> の第 0 要素は <code>e</code> と、第 4 要素は <code>d</code> と必ず同値ですが、第 1 要素が何になるかは実装依存です。</p><p>ゲーム開発者は、<strong><code>sort()</code> の比較関数が <code>0</code> を返す(等価な)要素の順序に依存しないように注意してください</strong> 。可能ならば、 <code>0</code> を返さないような比較関数を使うことを推奨します。</p><h2 id="edge-decode-error" tabindex="-1">Microsoft Edge でデコードエラーが出てしまう場合 <a class="header-anchor" href="#edge-decode-error" aria-label="Permalink to &quot;Microsoft Edge でデコードエラーが出てしまう場合 {#edge-decode-error}&quot;">​</a></h2><p>Microsoft Edge で、オーディオファイル(.aac)の読み込み時に下記のエラーが出力されてゲームの進行が止まることがあります。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>WEBAUDIO17014：デコードエラー：指定されたストリームが破損しているか、サポートされていません</span></span></code></pre></div><p>詳細な発生条件はわかっていませんが、他の環境では再生できるファイルでも再生できないことがあるようです。このエラーが出た場合、元ファイルのサンプルレートの変更や、出力するオーディオファイルのビットレートを変更を行うとエラーが解消される可能性があります。</p><p><a href="https://github.com/akashic-games/complete-audio" target="_blank" rel="noreferrer">complete-audio</a> で変換している場合は、</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>complete-audio -b 32k sound.wav</span></span></code></pre></div><p>のように <code>-b</code> オプションで出力するオーディオファイルのビットレートを指定することができます。</p><h2 id="audio-problem" tabindex="-1">一部の環境でゲーム開始時に自動的に音声が再生されない <a class="header-anchor" href="#audio-problem" aria-label="Permalink to &quot;一部の環境でゲーム開始時に自動的に音声が再生されない {#audio-problem}&quot;">​</a></h2><p>Akashic ゲームで「一部の音声が、ユーザが操作 (クリックなど) した時にしか再生できない」という現象が発生することがあり、以下のブラウザでその現象が確認されています。</p><ul><li>Google Chrome</li><li>Safari</li><li>一部環境の Opera</li></ul><p>この現象の原因は、ブラウザの Web 広告対策のために音声再生が制限されることがあるためです。 しかし現状では、そのブラウザの制限を完全になくしてゲーム開始時に自動的に音声を再生させる方法は見いだせていません。ですので、ゲームデザインとして最初に一度以上クリックさせるような作りにするという形で対応してください。</p><h2 id="ranking-random" tabindex="-1">ランキング対応ニコ生ゲームで、意図せずプレイヤーごとに乱数が異なる <a class="header-anchor" href="#ranking-random" aria-label="Permalink to &quot;ランキング対応ニコ生ゲームで、意図せずプレイヤーごとに乱数が異なる {#ranking-random}&quot;">​</a></h2><p>ランキング対応ニコ生ゲームでは、<code>g.Game#random</code> を利用してもプレイヤーごとに異なる乱数が生成されます。(<code>g.Game#localRandom</code> と同じになってしまう)</p><p>プレイヤー間で共通の乱数を生成する場合は、ランキングゲームテンプレートが独自に提供する乱数生成器を利用する必要があります。詳細は、<a href="/shin-ichiba/ranking/ranking-by-template.html#random">テンプレートでわかるランキング対応ゲーム の 注意点: 乱数について</a> を参照してください。</p>`,50),t=[c];function i(d,p,r,l,h,u){return o(),e("div",null,t)}const k=a(n,[["render",i]]);export{g as __pageData,k as default};