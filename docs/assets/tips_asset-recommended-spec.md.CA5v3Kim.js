import{_ as e,c as a,o as t,a3 as o}from"./chunks/framework.DaCD_bki.js";const s="/assets/aco.I1oElrk7.png",r="/assets/aco-valid-border.0_hzZfuT.png",c="/assets/aco-invalid-border.BrRXY7jV.png",p="/assets/aco-drawn-with-noise.O1BBPr1g.png",P=JSON.parse('{"title":"素材の推奨仕様","description":"","frontmatter":{},"headers":[],"relativePath":"tips/asset-recommended-spec.md","filePath":"tips/asset-recommended-spec.md"}'),i={name:"tips/asset-recommended-spec.md"},d=o('<h1 id="素材の推奨仕様" tabindex="-1">素材の推奨仕様 <a class="header-anchor" href="#素材の推奨仕様" aria-label="Permalink to &quot;素材の推奨仕様&quot;">​</a></h1><h2 id="これは" tabindex="-1">これは <a class="header-anchor" href="#これは" aria-label="Permalink to &quot;これは {#これは}&quot;">​</a></h2><p>Akashic のゲーム中で、アセットとして用いる素材に関する推奨仕様をまとめます。</p><h2 id="推奨仕様" tabindex="-1">推奨仕様 <a class="header-anchor" href="#推奨仕様" aria-label="Permalink to &quot;推奨仕様 {#推奨仕様}&quot;">​</a></h2><p>素材の <strong>推奨仕様</strong> とは、Akashic がゲーム開発者に推奨する素材の仕様です。</p><p>要求仕様(ここでは触れません)と異なり、ゲーム開発者は必ずしも推奨仕様に従う必要はありません。推奨仕様は、多くのゲーム開発者にとってより意図に近い・望ましいであろう動作を実現するための一種のガイドラインであり、従わない場合でもゲームは動作します。</p><h3 id="一つの画像ファイル中の複数の画像は間隔を空ける" tabindex="-1">一つの画像ファイル中の複数の画像は間隔を空ける <a class="header-anchor" href="#一つの画像ファイル中の複数の画像は間隔を空ける" aria-label="Permalink to &quot;一つの画像ファイル中の複数の画像は間隔を空ける {#一つの画像ファイル中の複数の画像は間隔を空ける}&quot;">​</a></h3><p>Akashic のゲームでは、複数の画像を一つの画像ファイルにまとめたもの(並べたもの)を扱うことがあります。</p><p>典型的な例は、スプライト(<code>g.Sprite</code>)に用いる画像(<code>g.SpriteParameterObject#src</code>)です。スプライトは与えられた画像の一部だけを表示することができ、また表示内容を同じ画像の別の部分に容易に切り替えられます。この機能のため、スプライトに用いる画像ファイルは、以下のような複数の内容を一つにまとめたものになる場合があります。</p><p><img src="'+s+'" alt="複数の画像を並べた一つの画像ファイルの例"></p><p>この時、ファイル中の各画像の境界部分には 1 ピクセル以上の間隔を設けることが推奨されます。すなわち画像同士の境界に接する各ピクセルは、透明色であるべきです。</p><p>例えば次の画像は、上の画像の一部を拡大したものです。</p><p><img src="'+r+'" alt="境界部分に1ピクセルの間隔がある画像"></p><p>ここで赤の点線は境界を示すための仮想的なものです。この例では、各画像の境界部分(赤の点線)に接するピクセルはすべて透明色になっています。他方、この画像全体を左に 1 ピクセルずらしたものが次の画像です。境界として取り扱う範囲を変えない場合、境界に接している不透明色のピクセルが二つ存在することがわかります。</p><p><img src="'+c+'" alt="境界に1ピクセルの間隔がない画像"></p><p>この画像は推奨仕様に従っていません。</p><h4 id="推奨の理由" tabindex="-1">推奨の理由 <a class="header-anchor" href="#推奨の理由" aria-label="Permalink to &quot;推奨の理由 {#推奨の理由}&quot;">​</a></h4><p>この推奨に従わない場合、画像の拡大・縮小描画の際に隣接する不透明色が「滲む」ことがあります。以下はある環境において、前述の「推奨仕様に従ってない画像」に示した一部分を、5 倍に拡大して描画する <code>g.Sprite</code> を表示したものです。</p><p><img src="'+p+'" alt="境界に接するピクセルの不透明色が滲んでいる例"></p><p>キャラクタの右側に滲んだ不透明色が確認できます。</p><p>ビットマップフォント(<code>g.BitmapFont</code>)として使う画像や、タイル(<code>g.Tile</code>)に与えるマップチップ画像(<code>g.TileParameterObject#src</code>)などにも同様の注意が必要です。特にタイルは、その性質上間隔を空けずに使うことが多いと考えられます。従ってタイルの拡大縮小は推奨されません。</p>',21),n=[d];function l(h,_,m,g,u,b){return t(),a("div",null,n)}const k=e(i,[["render",l]]);export{P as __pageData,k as default};