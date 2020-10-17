precision mediump float;

uniform vec3 ambientLight;
uniform vec3 lightDirection;
uniform vec3 lightIntensity;
uniform vec3 modelColor;

varying vec3 fragNormal;

void main()
{
	vec3 light = ambientLight + lightIntensity * max( -dot( fragNormal, normalize(lightDirection) ), 0.0);

	gl_FragColor = vec4(light * modelColor, 1.0);
}