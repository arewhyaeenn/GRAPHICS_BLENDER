precision mediump float;

uniform sampler2D texture;
uniform sampler2D normalMap;

uniform vec3 ambientLight;
uniform vec3 lightDirection;
uniform vec3 lightIntensity;

// varying vec3 fragNormal;
varying vec2 fragTexCoord;
varying mat3 mTangent;

void main()
{
	vec3 fragNormal = texture2D(normalMap, fragTexCoord).rgb;
	fragNormal = fragNormal * 2.0 - 1.0;
	fragNormal = normalize(mTangent * fragNormal);

	vec4 texel = texture2D(texture, fragTexCoord);
	vec3 light = ambientLight + lightIntensity * max( -dot( fragNormal,normalize(lightDirection) ), 0.0);
	
	gl_FragColor = vec4(texel.rgb * light, texel.a);
}