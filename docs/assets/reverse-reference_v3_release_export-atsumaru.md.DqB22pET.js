import{_ as e,c as a,o as s,a3 as t}from"./chunks/framework.DaCD_bki.js";const k=JSON.parse('{"title":"ゲームアツマール向けに出力する","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/release/export-atsumaru.md","filePath":"reverse-reference/v3/release/export-atsumaru.md"}'),i={name:"reverse-reference/v3/release/export-atsumaru.md"},r=t('<h1 id="ゲームアツマール向けに出力する" tabindex="-1">ゲームアツマール向けに出力する <a class="header-anchor" href="#ゲームアツマール向けに出力する" aria-label="Permalink to &quot;ゲームアツマール向けに出力する&quot;">​</a></h1><div class="strong-warn-info"><h3>ゲームアツマールのサービス終了について</h3><p> ゲームアツマールは2023年6月28日にサービスを終了します。これに伴い、2023年4月19日現在では新規のゲーム投稿は行えません。詳細は <a href="https://blog.nicovideo.jp/niconews/183352.html">こちら</a> をご覧ください。 (なおニコニコ生放送で遊べる<u>「ニコ生ゲーム」は引き続きご利用いただけます</u>。<a href="/shin-ichiba/submit.html">投稿方法</a>のみ変更になります) </p></div><p>ゲームアツマールに投稿するためのファイルを作成するには、<code>akashic export html</code> コマンドを利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">akashic</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> export</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> html</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --output</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./game.zip</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --atsumaru</span></span></code></pre></div><p>シングルプレイゲームで、かつニコ生ゲームとして申請 <strong>しない</strong> 場合は、一般的な HTML5 ゲームとして投稿することもできます。 この場合は <a href="./export-html.html">HTML5 ゲームとして出力する</a> の手順で生成したフォルダを .zip 形式に圧縮して投稿してください。</p><h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p><code>akashic export</code> コマンドは <code>game.json</code> ファイルのあるディレクトリで実行してください。<code>--output</code> オプションの指定は、 .zip で終わるパスを指定してください (./game.zip など)。 <code>--atsumaru</code> オプションをつけることで、ゲームアツマールとニコニコ生放送に対応した形式のファイルを生成します。</p><h3 id="ニコ生ゲームとしても申請する場合" tabindex="-1">ニコ生ゲームとしても申請する場合 <a class="header-anchor" href="#ニコ生ゲームとしても申請する場合" aria-label="Permalink to &quot;ニコ生ゲームとしても申請する場合&quot;">​</a></h3><p>現在のところ、ニコ生ゲームは zip ファイルの展開後のサイズが 10MB 以下である必要があります。これを超える場合、アツマールには投稿できますが、ニコ生ゲームとして登録申請する際に失敗するので注意してください。</p><p>また、事前に全てのテキストファイル (.js, .json, .txt) の文字コードが UTF-8 であることを確認してください。 <code>akashic export</code> コマンドは、効率化のためできるだけテキストファイルを一つにまとめます。このとき Shift JIS など、UTF-8 でない文字コードが使われていると、game.zip の中身が文字化けしてしまうことがあります。</p><p>ニコ生ゲームの作成については、 <a href="/shin-ichiba/">ニコ生ゲームを作ろう</a> を参照してください。</p>',12),o=[r];function h(n,p,c,l,d,u){return s(),a("div",null,o)}const _=e(i,[["render",h]]);export{k as __pageData,_ as default};