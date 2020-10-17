class UniformColorMesh extends Mesh
{
	/*
		Set up transform
		Set up WebGL references
		Create and populate position and index buffer objects
	*/
	constructor(gl, program, positionArray, normalArray, indexArray, color=new Float32Array([0.0,0.0,0.0]), position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(gl, program, positionArray, normalArray, indexArray, position, rotation, scale);

		this.color = color;
		this.colorUniformLocation = this.gl.getUniformLocation(this.program, "modelColor");
	}

	activate()
	{
		super.activate();
		
		this.gl.uniform3fv(this.colorUniformLocation, this.color);
	}
}