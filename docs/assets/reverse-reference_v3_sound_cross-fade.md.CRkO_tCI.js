import{_ as s,c as i,o as a,a3 as e}from"./chunks/framework.DaCD_bki.js";const E=JSON.parse('{"title":"BGM をクロスフェードで切り替える","description":"","frontmatter":{},"headers":[],"relativePath":"reverse-reference/v3/sound/cross-fade.md","filePath":"reverse-reference/v3/sound/cross-fade.md"}'),t={name:"reverse-reference/v3/sound/cross-fade.md"},n=e(`<h1 id="bgm-をクロスフェードで切り替える" tabindex="-1">BGM をクロスフェードで切り替える <a class="header-anchor" href="#bgm-をクロスフェードで切り替える" aria-label="Permalink to &quot;BGM をクロスフェードで切り替える&quot;">​</a></h1><p><code>g.AudioUtil.crossFade()</code> を用いて、音声をクロスフェードで切り替えることができます。</p><h2 id="凡例" tabindex="-1">凡例 <a class="header-anchor" href="#凡例" aria-label="Permalink to &quot;凡例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> bgm1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scene.asset.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAudio</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/assets/bgm1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> bgm2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scene.asset.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getAudio</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/assets/bgm2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> context1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.game.audio.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(bgm1);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> context2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> g.game.audio.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(bgm2);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">context1.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">play</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 5 秒間で再生中の context1 (bgm1) をフェードアウトしながら context2 (bgm2) をフェードイン</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">g.AudioUtil.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">crossFade</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(g.game, context2, context1, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h2 id="詳細" tabindex="-1">詳細 <a class="header-anchor" href="#詳細" aria-label="Permalink to &quot;詳細&quot;">​</a></h2><p>2 つの BGM をクロスフェードさせるには <code>g.AudioUtil.crossFade()</code> を利用します。</p><p>この関数は <code>g.AudioPlayContext</code> を操作するユーティリティ関数として実現されています。 <code>g.AudioPlayContext</code> については <a href="./audio-play-context.html">逆引きリファレンス » AudioPlayContext で音声を再生する</a> を参照してください</p><h2 id="関連情報" tabindex="-1">関連情報 <a class="header-anchor" href="#関連情報" aria-label="Permalink to &quot;関連情報&quot;">​</a></h2><ul><li><a href="https://akashic-games.github.io/akashic-engine/v3/modules/AudioUtil.html" target="_blank" rel="noreferrer">API リファレンス</a></li><li><a href="./audio-play-context.html">逆引きリファレンス » AudioPlayContext で音声を再生する</a></li></ul>`,9),h=[n];function l(p,k,r,d,o,c){return a(),i("div",null,h)}const y=s(t,[["render",l]]);export{E as __pageData,y as default};