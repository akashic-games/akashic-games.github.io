#version 100
precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
  // 対象ピクセルの色情報を取得
  vec4 color = texture2D(uSampler, vTexCoord);

  // 対象ピクセルのRGB値を加算
  float sum = dot(color.rgb, vec3(1.0));

  // モノクロ化
  vec3 outColor = vec3(sum / 3.0);

  // 最終出力色
  gl_FragColor = vec4(outColor, color.a * uAlpha);
}
