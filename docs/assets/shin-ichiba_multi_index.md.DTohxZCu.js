import{_ as s,c as t,I as n,w as o,k as e,a,a3 as l,E as r,o as h}from"./chunks/framework.DaCD_bki.js";const d="/assets/screenshot-niconicoSnake.ByGWLzFo.png",y=JSON.parse('{"title":"マルチプレイゲーム","description":"","frontmatter":{},"headers":[],"relativePath":"shin-ichiba/multi/index.md","filePath":"shin-ichiba/multi/index.md"}'),p={name:"shin-ichiba/multi/index.md"},c=e("h1",{id:"マルチプレイゲーム",tabindex:"-1"},[a("マルチプレイゲーム "),e("a",{class:"header-anchor",href:"#マルチプレイゲーム","aria-label":'Permalink to "マルチプレイゲーム"'},"​")],-1),u=e("p",null,[e("strong",null,"マルチプレイゲーム"),a(" は、放送者と視聴者が一つのゲームの同一のプレイを遊ぶ形式のニコ生ゲームです。 最終得点のみを競うランキングゲームと異なり、ゲーム内のプレイヤー同士にインタラクションさせることができます。")],-1),k=e("img",{src:d},null,-1),m=l(`<p>マルチプレイゲームは、以下の要求仕様を除き通常の Akashic ゲームです。 <a href="/tutorial/v3/multiplay/introduction.html">Akashic Engine 入門 » マルチプレイのゲーム作成</a> を参照してコンテンツを作成してください。</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>以下、このページでは技術的な仕様を扱っています。 ゲーム作成の考え方や具体的なコードの例については、<a href="/shin-ichiba/make-multi/column-about-multi.html"><strong>マルチプレイゲームを作ろう</strong></a> も参照してください。</p></div><h2 id="requirements" tabindex="-1">要求仕様 <a class="header-anchor" href="#requirements" aria-label="Permalink to &quot;要求仕様 {#requirements}&quot;">​</a></h2><h3 id="supported-modes" tabindex="-1">supportedModes <a class="header-anchor" href="#supported-modes" aria-label="Permalink to &quot;supportedModes {#supported-modes}&quot;">​</a></h3><p>マルチプレイのニコ生ゲームは、 game.json の <code>environment.nicolive.supportedModes</code> の値に <code>[&quot;multi_admission&quot;]</code> を指定している必要があります。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;environment&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;nicolive&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;supportedModes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;multi_admission&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="resolution-and-fps" tabindex="-1">解像度・FPS・サイズ <a class="header-anchor" href="#resolution-and-fps" aria-label="Permalink to &quot;解像度・FPS・サイズ {#resolution-and-fps}&quot;">​</a></h3><p>ランキングモードと同じく、次の条件を満たす必要があります。</p><ul><li><strong>画面解像度</strong>: 1280x720 以下 (16:9 を推奨)</li><li><strong>FPS</strong>: 1 以上 60 以下 (30 または 60 を推奨)</li><li><strong>ファイルサイズ</strong><ul><li>全体: 30MB 以下 (zip 圧縮前)</li><li>game.json: 100KB 以下</li></ul></li></ul><div class="tip custom-block"><p class="custom-block-title">参考</p><ul><li><a href="/reverse-reference/v3/setting/game-size.html">逆引きリファレンス » 解像度を変更する</a></li><li><a href="/reverse-reference/v3/setting/fps.html">逆引きリファレンス » FPSを変更する</a></li></ul></div><h2 id="features" tabindex="-1">固有の動作と機能 <a class="header-anchor" href="#features" aria-label="Permalink to &quot;固有の動作と機能 {#features}&quot;">​</a></h2><h3 id="player-info" tabindex="-1">ユーザ名の取得 <a class="header-anchor" href="#player-info" aria-label="Permalink to &quot;ユーザ名の取得 {#player-info}&quot;">​</a></h3><p>マルチプレイのニコ生ゲームでは、ニコニコのユーザ名を利用することができます。 詳細は <a href="./player-info.html">ユーザ名を使う</a> を参照してください。</p><p>ただし必要となる機能の関係上、 Akashic Engine v3 以降でゲームが作成されている必要があります。</p><h3 id="broadcaster" tabindex="-1">放送者の判別 <a class="header-anchor" href="#broadcaster" aria-label="Permalink to &quot;放送者の判別 {#broadcaster}&quot;">​</a></h3><p>マルチプレイのニコ生ゲームでは、配信上で放送者であるプレイヤーを識別することができます。 詳細は <a href="./broadcaster.html">放送者を判別する</a> を参照してください。</p><h3 id="admission" tabindex="-1">プレイヤーの募集 <a class="header-anchor" href="#admission" aria-label="Permalink to &quot;プレイヤーの募集 {#admission}&quot;">​</a></h3><p>マルチプレイのニコ生ゲームでは、起動時にランキングゲームと同様 [プレイヤーの募集][] が行われます。 何らかの理由でプレイヤー募集を行いたくない場合は、 <a href="#supported-modes">supportedModes</a> に <code>&quot;multi_admission&quot;</code> ではなく <code>&quot;multi&quot;</code> を指定してください。</p><h2 id="debug" tabindex="-1">動作確認 <a class="header-anchor" href="#debug" aria-label="Permalink to &quot;動作確認 {#debug}&quot;">​</a></h2><p>マルチプレイゲームの動作確認は、Akashic ゲームとして単に <code>akashic serve</code> コマンドで行うことができます。 ただしニコ生ゲームの場合は <code>--target-service nicolive</code> オプションが利用できます。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> akashic</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> serve</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --target-service</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nicolive</span></span></code></pre></div><p><code>--target-service</code> (短縮形 <code>-s</code>) オプションは、 serve コマンドに特定のサービス上の動作をできるだけ再現させるものです。 現在指定可能な値は <code>nicolive</code> と <code>none</code> (デフォルト値) の二つです。</p><p><code>nicolive</code> が指定された場合、 serve コマンドは次のように振る舞います。</p><ul><li>放送者役をいちいち Join させなくてもいいように <ul><li>起動後、最初に開かれたブラウザウィンドウのプレイヤーを必ず Join させる</li><li>「新規プレイ」ボタンでゲームを始める時も、このブラウザウィンドウのプレイヤーを Join させる</li><li>「Join Me」ボタンが無効になる</li></ul></li><li>コンテンツ起動時に与えられる引数を、ニコニコ生放送と同様のものに <ul><li>詳細割愛 (通常、ゲーム開発者がこの値を参照する必要はありません)</li></ul></li></ul><p><a href="/tutorial/v3/multiplay/join.html">Akashic Engine 入門 » Join と Leave</a> でも記載のとおり、ニコニコ生放送では「放送者がただ一人 Join する」動作になっています。 <code>--target-service</code> を指定すると、「Join Me」ボタンを逐一押さずに放送者を含めた動作を確認することができます。</p><h2 id="submit" tabindex="-1">投稿 <a class="header-anchor" href="#submit" aria-label="Permalink to &quot;投稿 {#submit}&quot;">​</a></h2><p>作成したゲームを実際にニコニコ生放送上で遊ぶには、<a href="./../submit.html">ニコ生ゲームを投稿しよう</a> を参照してください。</p>`,27);function g(b,f,E,v,_,q){const i=r("CpationedFigure");return h(),t("div",null,[c,u,n(i,{caption:"いわゆるスネークゲームをマルチプレイで遊べる『ニコニコスネーク』の画面"},{default:o(()=>[k]),_:1}),m])}const C=s(p,[["render",g]]);export{y as __pageData,C as default};