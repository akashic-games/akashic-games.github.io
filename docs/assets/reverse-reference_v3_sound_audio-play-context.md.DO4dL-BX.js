import{_ as s,c as a,o as i,a3 as n}from"./chunks/framework.DaCD_bki.js";const E=JSON.parse('{"title":"AudioPlayContext で音声を再生する","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/sound/audio-play-context.md","filePath":"reverse-reference/v3/sound/audio-play-context.md"}'),e={name:"reverse-reference/v3/sound/audio-play-context.md"},t=n(`<h1 id="audioplaycontext-で音声を再生する" tabindex="-1">AudioPlayContext で音声を再生する <a class="header-anchor" href="#audioplaycontext-で音声を再生する" aria-label="Permalink to &quot;AudioPlayContext で音声を再生する&quot;">​</a></h1><p>フェードインやクロスフェード再生など、高度な音声再生には <code>g.AudioPlayContext</code> を利用します。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> bgm1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scene.asset.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAudio</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/assets/bgm1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> bgm2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scene.asset.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAudio</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/assets/bgm2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// bgm1 の AudioPlayContext を作成する</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ctx1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.game.audio.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(bgm1);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// bgm1 の音量を設定</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ctx1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">changeVolume</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// bgm1 の AudioPlayContext を鳴らす</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ctx1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">play</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// bgm1 の AudioPlayContext を止める</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ctx1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// g.game.audio.create() と g.game.audio.play() のシンタックスシュガー</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ctx2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.game.audio.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">play</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(bgm1);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// systemId が music の音声アセットに紐づくプレイヤーをすべて停止</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">g.game.audio.music.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">stopAll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre></div><h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p><code>akashic-engine@3.9.0</code> 以降、音声の再生に <code>g.AudioPlayContext</code> を利用することができます。</p><p>従来の API は BGM (<code>systemId</code> が <code>&quot;music&quot;</code> の音声アセット) を再生していた際に別の BGM を再生すると元々再生していた方は停止されていました。 一方で <code>g.AudioPlayContext</code> は複数の BGM の同時再生が可能になります。 これによりクロスフェードなど既存の API では実現できなかった機能の提供を可能にします。</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>ただし厳密な同時再生数は各環境により変動します。各環境での動作を保証するために、最大の同時再生数は 2 以下にすることを推奨します。</p></div><p>また、 <code>g.AudioPlayContext</code> は音声の初期化と再生が分離したインタフェースになっています。 従来は個別の音声アセットを一度 <code>play()</code> してからでないと音量を調節することができませんでしたが、<code>g.AudioPlayContext</code> を使うと音を鳴らす前に音量の調整が可能になります。</p><p>そのほかの変更として、<code>g.AudioPlayContext</code> は音声アセットとシーンのライフサイクルが同一になります。 従来の API はシーン遷移後も BGM が再生され続け、アセットが不要になっても破棄が遅延されました。 これはエンジン内部でのアセット管理を単純化した際に生じた挙動を反映したものです。</p><p>シーンを跨いで BGM を鳴らすには、対象の音声アセットをグローバルアセットにするか、遷移先のシーンでも同一のアセットを読み込むように指定しておく必要があります。 グローバルアセットについては <a href="./../asset/global-asset.html">逆引きリファレンス » グローバルアセットを使う</a> を参照してください。</p><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="https://akashic-games.github.io/akashic-engine/v3/" target="_blank" rel="noreferrer">API リファレンス</a></li><li><a href="./fade-in-fade-out.html">逆引きリファレンス » BGM をフェードイン・フェードアウトする</a></li><li><a href="./cross-fade.html">逆引きリファレンス » BGM をクロスフェードで切り替える</a></li></ul>`,13),l=[t];function h(p,k,d,o,r,c){return i(),a("div",null,l)}const y=s(e,[["render",h]]);export{E as __pageData,y as default};