import{_ as i,c as e,I as t,a3 as s,o as n,E as l}from"./chunks/framework.DaCD_bki.js";const m=JSON.parse('{"title":"効果音・BGM を再生する","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/sound/play.md","filePath":"reverse-reference/v3/sound/play.md"}'),h={name:"reverse-reference/v3/sound/play.md"},o=s('<h1 id="効果音・bgm-を再生する" tabindex="-1">効果音・BGM を再生する <a class="header-anchor" href="#効果音・bgm-を再生する" aria-label="Permalink to &quot;効果音・BGM を再生する&quot;">​</a></h1><p>音声アセットは <code>g.AudioAsset#play()</code> メソッドを用いて再生することができます。</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>Google Chrome や iOS 上の Safari ではユーザ操作 (クリックなど) があるまで音が鳴らないという仕様があります。ゲームの開始直後から BGM を再生するような場合は最初に一度以上ユーザ操作 (クリックなど) をさせるような作りにしてください。詳細は <a href="/tips/common-pitfalls.html#audio-problem">Tips » よくある落とし穴 » 一部の環境でゲーム開始時に自動的に音声が再生されない</a> を参照してください。</p></div><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.asset.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAudio</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/audio/sound1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">play</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ファイルパスが &quot;/audio/sound1&quot; の音声アセットが再生される</span></span></code></pre></div><p>音声アセットは <code>play()</code> メソッドで再生できます。 効果音として登録されたアセットは一度だけ、BGM として登録されたアセットはループ再生されます (後述)。</p><h2 id="利用例" tabindex="-1">利用例 <a class="header-anchor" href="#利用例" aria-label="Permalink to &quot;利用例&quot;">​</a></h2><p>次のコンテンツでは、「SE」の矩形をクリックすると効果音が、「BGM」の矩形をクリックするとが BGM が再生されます。</p>',8),p=s(`<h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>Akashic Engine で音声を扱うには、音声ファイルをアセットとして <code>game.json</code> に登録する必要があります。 音声ファイルは次のいずれかの組み合わせで用意する必要があります。これは、Web ページで音を再生する際に、利用可能な形式がブラウザごとに異なっているためです。</p><ul><li>Ogg Vorbis 形式 (.ogg) と M4A 形式 (.m4a)</li><li>Ogg Vorbis 形式 (.ogg) と AAC 形式 (.aac)</li></ul><p>音声ファイルを audio/ ディレクトリ (または <a href="/tutorial/v3/assetPaths.html#assets-dir">assets/ ディレクトリ</a>) に配置して <code>akashic scan asset</code> を実行するとアセットとして <code>game.json</code> に登録されます。 音声アセットは全て効果音 (<code>&quot;sound&quot;</code>) として登録されます。BGM (ループ再生する) としたい場合は game.json の対応するアセットを探して <code>systemId: &quot;sound&quot;</code> になっている箇所を <code>systemId: &quot;music&quot;</code> に変更してください。例えば以下のアセット ID <code>&quot;bgm1&quot;</code> を BGM としたい場合以下のように編集します。</p><div class="language-diff vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">diff</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&quot;bgm1&quot;: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &quot;type&quot;: &quot;audio&quot;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &quot;path&quot;: &quot;audio/bgm1&quot;,</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;">-  &quot;systemId&quot;: &quot;sound&quot;,</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">+  &quot;systemId&quot;: &quot;music&quot;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &quot;duration&quot;: 36227</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>音声アセットの再生・停止はシーンの読み込み後に行う必要があります。このシーンの読み込み完了のタイミングを知るには <code>scene.onLoad</code> トリガーを利用します。 シーン内で読み込まれている音声アセットは <a href="https://akashic-games.github.io/akashic-engine/v3/classes/AssetAccessor.html#getAudioById" target="_blank" rel="noreferrer"><code>scene.asset.getAudioById()</code></a> や <a href="https://akashic-games.github.io/akashic-engine/v3/classes/AssetAccessor.html#getAudio" target="_blank" rel="noreferrer"><code>scene.asset.getAudio()</code></a> で取得できます。アセットはシーンの生成時に <code>assetIds</code> または <code>assetPaths</code> で指定して読み込ませることができます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> scene</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Scene</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ game: g.game, assetPaths: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/audio/sound1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] }); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// シーン生成時にそのシーンで利用する音声アセットを予め指定する</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">scene.onLoad.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 中略</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sound1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scene.asset.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAudio</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/audio/sound1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ファイルパスが &quot;/audio/sound1&quot; の音声アセットを取得</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  scene.onPointDownCapture.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    sound1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">play</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 画面 をクリック・タップしたときに sound1 を再生する</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>Ogg Vorbis 形式 と M4A 形式の複数の音声ファイルを用意するために、<a href="https://github.com/akashic-games/complete-audio" target="_blank" rel="noreferrer">complete-audio</a>を利用することができます。これは .wav, .mp4, .mp3, .ogg, .aac, .m4a のどれか一つのファイルを与えると、Akashic Engine で必要な形式のファイルを一揃え生成するツールです。</p><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="/tutorial/v3/audio.html#se-gbgm">チュートリアル</a></li><li><a href="https://akashic-games.github.io/akashic-engine/v3/interfaces/AudioAsset.html#play" target="_blank" rel="noreferrer">API リファレンス</a></li><li><a href="https://akashic-games.github.io/tutorial/v3/assetPaths#assets-dir" target="_blank" rel="noreferrer">assets/ ディレクトリ</a></li><li><a href="https://akashic-games.github.io/akashic-engine/v3/classes/AssetAccessor.html#getAudioById" target="_blank" rel="noreferrer">getAudioById メソッド</a></li><li><a href="https://akashic-games.github.io/akashic-engine/v3/classes/AssetAccessor.html#getAudio" target="_blank" rel="noreferrer">getAudio メソッド</a></li><li><a href="https://github.com/akashic-games/complete-audio" target="_blank" rel="noreferrer">complete-audio</a></li></ul>`,10);function r(d,k,c,g,u,E){const a=l("PlaygroundElement");return n(),e("div",null,[o,t(a,{gameJsonUri:"/snippets/reverse-reference/sound/play-stop/game.json",width:600,height:400}),p])}const A=i(h,[["render",r]]);export{m as __pageData,A as default};