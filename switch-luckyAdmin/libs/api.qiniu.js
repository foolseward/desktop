import * as qiniu from 'qiniu-js'

console.log(qiniu)
qiniu.uploader({
  init:{
  	Key: function(up, file){
  	  console.log(up, file)
  	  return '1234';
  	}
  }
})

export default { qiniu }