import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.459ab1e9.js";const p="/assets/screenshot_getting-started_1.cafdbfab.png",l="/assets/screenshot_getting-started_2.9c1df7be.png",o="/assets/screenshot_getting-started_3.c8e8673e.png",m=JSON.parse('{"title":"ゲームの準備","description":"","frontmatter":{},"headers":[],"relativePath":"shin-ichiba/breakout/getting-started.md","filePath":"shin-ichiba/breakout/getting-started.md"}'),c={name:"shin-ichiba/breakout/getting-started.md"},t=e('<h1 id="ゲームの準備" tabindex="-1">ゲームの準備 <a class="header-anchor" href="#ゲームの準備" aria-label="Permalink to &quot;ゲームの準備&quot;">​</a></h1><p>早速ゲーム作りの準備を進めましょう。</p><h2 id="開発環境の準備" tabindex="-1">開発環境の準備 <a class="header-anchor" href="#開発環境の準備" aria-label="Permalink to &quot;開発環境の準備&quot;">​</a></h2><div class="info custom-block"><p class="custom-block-title">INFO</p><p>すでに Node.js や Visual Studio Code などの導入済みの方は読み飛ばしても構いません。</p></div><h2 id="node-js-のインストール" tabindex="-1">Node.js のインストール <a class="header-anchor" href="#node-js-のインストール" aria-label="Permalink to &quot;Node.js のインストール&quot;">​</a></h2><p>Akashic Engine のゲーム開発には Node.js が必要です。 Node.js は JavaScript のプログラムの実行と開発に必要なツールをまとめたソフトウェアです。</p><p>Node.js をインストールする方法はいくつかありますが、<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">公式サイト</a> に用意されているインストーラを利用するのが簡単です。 Node.js には最新の機能を利用できる Current 版と、安定版としての長期サポートを提供する LTS 版 (推奨版) があります。 Akashic Engine はどちらのバージョンでも動作しますが、このチュートリアルは LTS 版を前提に説明を進めます。</p><p><a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">公式サイト</a> から Node.js をダウンロードし、インストールしてください。</p><p>インストールが正常に行われたかどうかを確認するために、任意のディレクトリで次のコマンドを入力してください。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">node</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">node</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span></span></code></pre></div><p>このコマンドは Node.js のバージョンを画面に出力します。 正常にインストールされていれば次のようにバージョン番号が表示されます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">v18.16.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">v18.16.0</span></span></code></pre></div><p><img src="'+p+`" alt=""></p><h3 id="環境開発の準備" tabindex="-1">環境開発の準備 <a class="header-anchor" href="#環境開発の準備" aria-label="Permalink to &quot;環境開発の準備&quot;">​</a></h3><p>Akashic Engine を用いたゲーム開発には <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> を推奨しています。</p><p>Visual Studio Code は、無償で使える非常に強力でかつ軽量なコードエディタです。 Akashic Engine に限らず、一般的な JavaScript の開発においても有用です。</p><p>Visual Studio Code が未インストールであれば、 <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">こちらのリンク</a> から最新版をダウンロードしてインストールしておきましょう。</p><h2 id="ゲームのプロジェクトを作成" tabindex="-1">ゲームのプロジェクトを作成 <a class="header-anchor" href="#ゲームのプロジェクトを作成" aria-label="Permalink to &quot;ゲームのプロジェクトを作成&quot;">​</a></h2><h3 id="ゲームプロジェクトの初期化" tabindex="-1">ゲームプロジェクトの初期化 <a class="header-anchor" href="#ゲームプロジェクトの初期化" aria-label="Permalink to &quot;ゲームプロジェクトの初期化&quot;">​</a></h3><div class="info custom-block"><p class="custom-block-title">INFO</p><p>一部 <a href="/shin-ichiba/ranking/ranking-by-template.html">ニコ生ゲームを作ろう » ランキングゲームテンプレート</a> と内容が重複しています。</p></div><p>Akashic Engine でのゲーム開発には <a href="https://github.com/akashic-games/akashic-cli" target="_blank" rel="noreferrer">@akashic/akashic-cli</a> というコマンドラインツールの導入が必須です。 以下コマンドでインストールしておきます。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">@akashic/akashic-cli</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-g</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@akashic/akashic-cli</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-g</span></span></code></pre></div><p>インストール後、以下コマンドで正常にインストールされているか確認してください。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">akashic</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">akashic</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--version</span></span></code></pre></div><p>以下のようにバージョン番号 (ドット区切りの数字) が表示されれば成功です。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">2.16.58</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">2.16.58</span></span></code></pre></div><p><code>akashic</code> コマンドが確認できたら、ゲームディレクトリを作成します。 どこでもよいので、任意の場所にディレクトリを作成してください。</p><p>ゲームディレクトリを作成したら、CUI ウインドウでそのディレクトリへ移動後に以下コマンドを実行します。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">akashic</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">javascript-shin-ichiba-ranking</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">akashic</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-t</span><span style="color:#24292E;"> </span><span style="color:#032F62;">javascript-shin-ichiba-ranking</span></span></code></pre></div><p>コマンドを実行すると、いくつかの文字列が出力された後、 <code>prompt:</code> という表示とともにキー入力待ちとなります。 ここではデフォルトの設定を使うため、そのまま Enter キーを押して進めていきましょう。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">INFO: copied .editorconfig.</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: copied .eslintrc.js.</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: copied .gitignore.</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: copied README.md.</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: copied audio.</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: copied game.json.</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: copied image.</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: copied package.json.</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: copied script.</span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: copied text.</span></span>
<span class="line"><span style="color:#e1e4e8;">prompt: width:  (1280) </span></span>
<span class="line"><span style="color:#e1e4e8;">prompt: height:  (720) </span></span>
<span class="line"><span style="color:#e1e4e8;">prompt: fps:  (30) </span></span>
<span class="line"><span style="color:#e1e4e8;">INFO: Done!</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">INFO: copied .editorconfig.</span></span>
<span class="line"><span style="color:#24292e;">INFO: copied .eslintrc.js.</span></span>
<span class="line"><span style="color:#24292e;">INFO: copied .gitignore.</span></span>
<span class="line"><span style="color:#24292e;">INFO: copied README.md.</span></span>
<span class="line"><span style="color:#24292e;">INFO: copied audio.</span></span>
<span class="line"><span style="color:#24292e;">INFO: copied game.json.</span></span>
<span class="line"><span style="color:#24292e;">INFO: copied image.</span></span>
<span class="line"><span style="color:#24292e;">INFO: copied package.json.</span></span>
<span class="line"><span style="color:#24292e;">INFO: copied script.</span></span>
<span class="line"><span style="color:#24292e;">INFO: copied text.</span></span>
<span class="line"><span style="color:#24292e;">prompt: width:  (1280) </span></span>
<span class="line"><span style="color:#24292e;">prompt: height:  (720) </span></span>
<span class="line"><span style="color:#24292e;">prompt: fps:  (30) </span></span>
<span class="line"><span style="color:#24292e;">INFO: Done!</span></span></code></pre></div><p>Visual Studio Code で <code>ファイル</code> から <code>フォルダーを開く</code> を選択し、上記のディレクトリを指定します。</p><p><img src="`+l+`" alt=""></p><h3 id="ゲームプロジェクトの修正" tabindex="-1">ゲームプロジェクトの修正 <a class="header-anchor" href="#ゲームプロジェクトの修正" aria-label="Permalink to &quot;ゲームプロジェクトの修正&quot;">​</a></h3><p>テンプレート内にはサンプルがすでに実装されていますが、今回はゲームを新規で作成するため <code>ゲーム内容</code> の部分を削除しましょう。 <code>script/main.js</code> を以下のように書き換えます。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">param</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">game</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> g.game; </span><span style="color:#6A737D;">// よくアクセスするため変数に保持しておく</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">scene</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> g.</span><span style="color:#B392F0;">Scene</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        game,</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ニコ生ゲームのランキングモードでは g.game.vars.gameState.score の値がスコアとして扱われる</span></span>
<span class="line"><span style="color:#E1E4E8;">    game.vars.gameState </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { score: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> };</span></span>
<span class="line"><span style="color:#E1E4E8;">    scene.onLoad.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ここからゲーム内容を記述します</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ここまでゲーム内容を記述します</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    game.</span><span style="color:#B392F0;">pushScene</span><span style="color:#E1E4E8;">(scene);</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">exports</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">main</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">param</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">game</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> g.game; </span><span style="color:#6A737D;">// よくアクセスするため変数に保持しておく</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">scene</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> g.</span><span style="color:#6F42C1;">Scene</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        game,</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ニコ生ゲームのランキングモードでは g.game.vars.gameState.score の値がスコアとして扱われる</span></span>
<span class="line"><span style="color:#24292E;">    game.vars.gameState </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { score: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#24292E;">    scene.onLoad.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ここからゲーム内容を記述します</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ここまでゲーム内容を記述します</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    game.</span><span style="color:#6F42C1;">pushScene</span><span style="color:#24292E;">(scene);</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>次にゲームのディレクトリ構成を初期化します。 ゲームディレクトリ内に <code>text</code>、 <code>image</code>、 <code>audio</code> ディレクトリがあれば、それらを削除します。 その後に ゲームディレクトリ (game.json があるディレクトリ) に <code>assets</code> ディレクトリを新規作成してください。</p><p><img src="`+o+'" alt=""></p><p>以上でゲーム作成の準備が整いました。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Akashic Engine V2 以前をご存知の方に:</p><p><code>assets</code> ディレクトリは Akashic Engine V3 においてサポートされた機能です。 Akashic Engine V2 以前では、画像であれば <code>image</code>、オーディオであれば <code>audio</code> ディレクトリに、というようにアセットの種別ごとに配置するディレクトリが固定されていました。 これに対し <code>assets</code> ディレクトリには種別に関係なく自由にアセットファイルを配置することができます。 本チュートリアルでは <code>assets</code> ディレクトリのみを利用します。</p><p>詳細については <a href="/tutorial/v3/assetPaths.html#assets-dir">assets/ ディレクトリ</a> も併せて参照してください。</p></div><p>次章から、ゲーム開発を進めていきます。</p>',41),r=[t];function i(d,y,E,h,g,u){return a(),n("div",null,r)}const F=s(c,[["render",i]]);export{m as __pageData,F as default};