$(document).ready(function(){
	var rgb = location.hash
	
	if (rgb == ""){
		rgb = "#000000";
		location.hash = rgb
	}
	var r = parseInt(rgb.substr(1,2),16);
	var g = parseInt(rgb.substr(3,2),16);
	var b = parseInt(rgb.substr(5,2),16);
	update(r,g,b);
});
function update(r,g,b){
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);
	
	if (r < 0) r = 0;
	if (g < 0) g = 0;
	if (b < 0) b = 0;
	var r2 = r/255.0;
	var g2 = g/255.0;
	var b2 = b/255.0;
	location.hash = "#"+padHex(r.toString(16))+padHex(g.toString(16))+padHex(b.toString(16))
	$("h1").each(function(){
		$(this).text(location.hash);
	});
	
	$("#r_text").val(r);
	$("#g_text").val(g);
	$("#b_text").val(b);
	$("#r_float_text").val(r2);
	$("#g_float_text").val(g2);
	$("#b_float_text").val(b2);
	
	$("#color_show").css("background-color","rgb("+r+","+g+","+b+")");
	
	var ole = b*1 + g*256 + r*256*256;
	$("#ole_text").val(ole);
	
	var K = 1 - Math.max(r2,Math.max(g2,b2));
	var C=0,M=0,Y=0;
	if (K!=1){
		C = (1-r2-K)/(1-K)
		M = (1-g2-K)/(1-K)
		Y = (1-b2-K)/(1-K)
	}
	
	$("#c_text").val(C);
	$("#m_text").val(M);
	$("#y_text").val(Y);
	$("#k_text").val(K);
	
	var y = Math.round(0.299*r + 0.587*g + 0.114*b)
	var u = Math.round(-0.169*r - 0.331*g + 0.5*b + 128)
	var v = Math.round(0.5*r - 0.419*g - 0.081*b + 128)
	
	$("#yuv_y_text").val(y);
	$("#yuv_u_text").val(u);
	$("#yuv_v_text").val(v);

}
function oleUpdate(){
	var ole = $("#ole_text").val();
	var b = ole % 256
	var g = Math.floor(ole / 256) % 256
	var r = Math.floor(ole / 256 / 256) % 256
	update(r,g,b)
	
}
function yuvUpdate(){
	var y = parseFloat($("#yuv_y_text").val());
	var u = parseFloat($("#yuv_u_text").val());
	var v = parseFloat($("#yuv_v_text").val());
	var r = y + 1.40200 * (v-128)
	var g = y - 0.34414 * (u-128) - 0.71414*(v-128)
	var b = y + 1.77200 * (u-128)
//		if (r < 0) r = 0;
//		if (g < 0) g = 0;
//		if (b < 0) b = 0;
	console.log(y)
	console.log(u)
	console.log(v)
	console.log(r)
	console.log(g)
	console.log(b)
	update(r,g,b)
	
}
function padHex(str){
	console.log(str)
	str = str.toUpperCase();
	if (str.length == 1){
		return "0"+str;
	}
	else{
		return str;
	}
}
