export const shaderData = {
  frag: `varying vec2 vUv;
  uniform float time;
  uniform sampler2D perlin;

  void main() {
    vec2 uv = vUv;
    float d = texture2D(perlin, vUv*1.0).r;
    vec2 uv2 = uv - 0.5;
    uv = vec2(uv.x - 0.5, uv.y - 0.66) + (d * 0.02);

    uv = vec2(uv.x / uv.y, 1.0 / uv.y - time);
    uv = abs((fract(uv * 4.0) - 0.5) * 2.0) - 0.88;
    float grid = max(uv.x, uv.y);
    grid *= 10.0;
   
    
    gl_FragColor = vec4(grid,0,grid, 1)*clamp((-uv2.y * 3.0),0.0,1.0) / d;
  }`,
  vert: `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`
};
