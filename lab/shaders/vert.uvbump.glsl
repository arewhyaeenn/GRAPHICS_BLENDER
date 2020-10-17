precision mediump float;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform mat3 mNormal;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
attribute vec3 vertNormal;
attribute vec3 vertTangent;

varying vec2 fragTexCoord;
// varying vec3 fragNormal;
varying mat3 mTangent;

void main()
{
	fragTexCoord = vertTexCoord;
	// fragNormal = normalize(mNormal * vertNormal);

	vec3 tangent = normalize((mWorld * vec4(vertTangent, 0.0)).xyz);
	vec3 normal = normalize(mNormal * vertNormal);
	vec3 bitangent = cross(normal, tangent);
	mTangent = mat3(tangent, bitangent, normal);

	gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}