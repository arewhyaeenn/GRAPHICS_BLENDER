precision mediump float;

uniform vec3 ambientLight;
uniform vec3 lightDirection;
uniform vec3 lightIntensity;

varying vec3 fragColor;
varying vec3 fragNormal;

void main()
{
	vec3 light = ambientLight + lightIntensity * max( -dot( fragNormal,normalize(lightDirection) ), 0.0);

	gl_FragColor = vec4(light * fragColor, 1.0);
}