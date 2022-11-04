## 渲染管线
3D模型转2维图像，通过GLSL着色器控制

Vertex Data[] 顶点数据 => Vertex Shader 顶点着色器 => 
Shape Assembly 形状（图元）装配 => Geometry Shader 几何着色器 => 
Tests and Blending 测试与混合 => Fragment Shader 片段着色器 => Rasterization 光栅化

裁剪空间坐标： -1~1

创建WebGL上下文
  创建着色程序
    顶点着色器
    片元着色器
  bufferData
    数据存入缓冲区
      vertexAttribPointer -> 从缓冲中读取数据 -> drawArrays -> 运行着色程序