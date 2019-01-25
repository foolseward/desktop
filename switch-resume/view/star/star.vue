<template>
  <div>
    <div ref="background" :style="{'line-height':0, 'overflow':'hidden'}"
  ></div>
    <div ref="inter" style="position:absolute;top:-1px;left:0;width:100%;height:100%;line-height:0;background-color:transparent;">
      <img :style="{width: head_svg_width+ 'vw'}" src="./source/easy/timg_head.svg" alt="" @click="resize">
    </div>
  </div>
</template>

<script>
import { 
Scene, PerspectiveCamera, WebGLRenderer, TextureLoader, Object3D, Vector3, PointLight, Matrix4
, Raycaster, MeshBasicMaterial, BufferGeometry, BufferAttribute, PointsMaterial, ImageUtils, Points, Fog, } from 'three'

import { sizeMixin, alertMixin } from '@/mixin'
import { throttle } from '@/libs/tools'
import OrbitControls from 'three-orbitcontrols'

import time from './source/easy/bg.svg'
import time_head from './source/easy/timg_head.svg'

import venusmap_circle from './source/easy/easy4.png'
import earth_circle from './source/easy/easy2.png'
import yellow_circle from './source/easy/hard2.png'
import red_circle from './source/easy/hard1.png'


export default {
  name:'star',
  mixins: [sizeMixin, alertMixin],
  // beforeRouteEnter: (to, from, next) => {
  //   new Promise((res, rej) => {
  //     setTimeout(() => {
  //       res();
  //     }, 3000);
  //   }).then(() => {
  //     next( vm => {
  //       vm.$store.commit('setInterceptorStatus', false);
  //     });
  //   })   
  // },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      let renderer;
      let camera;
      let axis;
      let holdon= false;
      let x;
      let y;
      let timeStamp;
      let rate= 1.5;
      let RATE_LIMIT= 1;
      let selfRotateArr;
      let raycaster= new Raycaster();
      raycaster.params.Points.threshold = 20;
      let CAMERA_POSITION= {
        x: 0, 
        y: 0,
        z: 200,
      }

      let ele= this.$refs.background;

      var scene = new Scene();
      camera = new PerspectiveCamera(120, (window.innerWidth)/window.innerHeight, 0.1, 1000);
      this.STATIC.camera= camera;
      renderer = new WebGLRenderer();
      this.STATIC.renderer= renderer;

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xffffff);

      ele.appendChild(renderer.domElement);

      scene.background = new TextureLoader().load( time );
      let ground = new Object3D();
      let objects= [];
      this.createBalls(ground, objects, raycaster);
      scene.add(ground);

      axis = new Vector3( 5, 5, 5);

      let rotateAroundObjectAxis= function(object, axis, radians) {
          let rotObjectMatrix = new Matrix4();
          rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
          object.matrix.multiply(rotObjectMatrix);
          object.rotation.setFromRotationMatrix(object.matrix);
      }

      let rotateAroundWorldAxis= function (object, axis, radians) {
          let rotWorldMatrix = new Matrix4();
          rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

          rotWorldMatrix.multiply(object.matrix);              

          object.matrix = rotWorldMatrix;
          object.rotation.setFromRotationMatrix(object.matrix);
      }

      camera.position.x = CAMERA_POSITION.x;
      camera.position.y = CAMERA_POSITION.y;
      camera.position.z = CAMERA_POSITION.z;

      let mousedownFunc= (ev) => {
        timeStamp= ev.timeStamp;
        holdon= true;
        x= ev.clientX;
        y= ev.clientY;
        setTimeout(() => {
          holdon= false
        }, 1000);
        return false;
      }
      this.STATIC.mousedown= mousedownFunc;
      this.$refs.inter.addEventListener("mousedown", mousedownFunc, {passive:false});

      let mouse = new Vector3();
      let clickFunc= (ev) => {
        holdon= false;
        let subStamp= ev.timeStamp- timeStamp;
        //为ios区分触摸结束是点击引起的还是点击动作引起的
        mouse.set(
          (ev.clientX / window.innerWidth)*2- 1,
          -(ev.clientY / window.innerHeight)*2+ 1, 
          50
        );
        raycaster.setFromCamera( mouse, camera );
        let a= raycaster.intersectObjects( objects, true );
        if(a.length){
          let name= a[0].object.name;
          if(name){
            this.$router.push('/'+ a[0].object.name)
          } else {
            this.resize();
            this.callAlert({type: 'error', msg: '制作中...'})
          }
        }
        rate= 1.5* Math.sqrt(Math.pow(ev.clientX- x, 2)+ Math.pow(ev.clientY- y, 2))/subStamp;
        return false;
      }
      this.STATIC.click= clickFunc;
      this.$refs.inter.addEventListener("click", clickFunc);

      this.$refs.inter.addEventListener("mousemove", throttle((ev) => {
        if(!holdon) return;
        //ev= ev.changedTouches[0];
        let mx= ev.clientX;
        let my= ev.clientY;
        let cx= mx- x;
        let cy= my- y;
        let arr= this.axisCalc(cx, cy);
        if(arr[0] || arr[1]){
          axis= new Vector3( arr[0], arr[1], 0);
        }
      }, 100, {leading: false}), {passive:false}, true);
      
      this.$refs.inter.addEventListener("touchstart", (ev) => {
        ev.preventDefault();
        timeStamp= ev.timeStamp;
        holdon= true;
        RATE_LIMIT= 8;
        ev= ev.changedTouches[0];
        x= ev.clientX;
        y= ev.clientY;
        return false;
      }, {passive:false});

      this.$refs.inter.addEventListener("touchend", (ev) => {
        holdon= false;
        RATE_LIMIT= 1;
        let subStamp= ev.timeStamp- timeStamp;
        ev= ev.changedTouches[0];
        //为ios区分触摸结束是点击引起的还是点击动作引起的
        if(Math.abs(ev.clientX- x)<5 && Math.abs(ev.clientY- y)<5){
          mouse.set(
            (ev.clientX / window.innerWidth)*2- 1,
            -(ev.clientY / window.innerHeight)*2+ 1, 
            50
          );
          raycaster.setFromCamera( mouse, camera );
          let a= raycaster.intersectObject( ground, true );
          if(a.length){
          let name= a[0].object.name;
            if(name){
              this.$router.push('/'+ a[0].object.name)
            } else {
              this.resize();
              this.callAlert({type: 'error', msg: '制作中...'})
            }
          }
        }
        let preRate= RATE_LIMIT* Math.sqrt(Math.pow(ev.clientX- x, 2)+ Math.pow(ev.clientY- y, 2))/subStamp;
        rate= preRate > 4? preRate: 4; 
        // rate= rate* Math.sqrt(Math.pow(ev.clientX- x, 2)+ Math.pow(ev.clientY- y, 2))/subStamp;
        // console.log(Math.sqrt(Math.pow(ev.clientX- x, 2)+ Math.pow(ev.clientY- y, 2))/subStamp, rate)
        return false;
      });

      this.$refs.inter.addEventListener("touchmove", throttle((ev) => {
        holdon= false;
        ev= ev.changedTouches[0];
        let mx= ev.clientX;
        let my= ev.clientY;
        let cx= mx- x;
        let cy= my- y;
        let arr= this.axisCalc(cx, cy);
        axis= new Vector3( arr[0], arr[1], 0);
      }, 100, {leading: false}), {passive:false}, true);
      let rateFunc= () => {
        //如果拖动，则速度累加
        if(holdon){
          rate+= 0.2
        } else {
          if(rate> RATE_LIMIT){
          rate*= 248/250;
        } else {
          rate= RATE_LIMIT;
        }
        }
      };

      this.createLights(scene);

      scene.fog = new Fog(0x000000,100,550);
      let animate= function(){
        let arr= objects
        rateFunc();
        if(1){
          rotateAroundWorldAxis(ground, axis, rate* Math.PI / 540);
          // for(let i=0; i<objects.length; i++){
          //   let arr= objects[i];
          //   arr.lookAt(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
          // }
        }
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
      }
      animate();
    },
    toLoginPage(){
      this.$router.push("login");
    },
    createLights(scene){
      let light2 = new PointLight( 0xffffff, 1, 3000 );
      light2.position.set( 100, 100, 1000 );
      scene.add( light2 );
    },
    createBalls(ground, objects, raycaster){
      let BALL_RATE= 5.5;
      let balls= [
        {
          x: -5,y: 2,z: 22,
          size: 6,
          rotateRate: 0.2,
          url: earth_circle,
        },
        {
          x: -5,y: 22,z: -12,
          size: 6,
          rotateRate: 0.2,
          url: red_circle,
          name: 'recume'
        },
        {
          x: -12,y: -16,z: -12,
          size: 6,
          rotateRate: 0.2,
          url: yellow_circle,
          name: 'countdown'
        },
        {
          x: 24,y: 2,z: 0,
          size: 6,
          rotateRate: 0.2,
          url: venusmap_circle,
        },
      ];
      for ( var i = 0; i < balls.length; i++ ) {
        console.log(1)
        var p= 0;
        let geometry = new BufferGeometry();
        let positions = new Float32Array( 3 );
        positions[ p++ ] = 0;
        positions[ p++ ] = 0;
        positions[ p++ ] = 0;
        geometry.addAttribute( 'position', new BufferAttribute( positions, 3 ) );
        let material = new PointsMaterial({
           color: 0xffffff,
           size: balls[i].size* 8,
           map: ImageUtils.loadTexture(balls[i].url),
           transparent: true,
           depthTest: false
        });
        geometry.computeBoundingSphere();
        var particles = new Points( geometry, material);
        let object = new Object3D();
        object.add(particles);
        particles.name= balls[i].name;
        objects.push(particles);
        object.position.x= balls[i].x* BALL_RATE;
        object.position.y= balls[i].y* BALL_RATE;
        object.position.z= balls[i].z* BALL_RATE;
        ground.add(object);
      } 
    },
    axisCalc(cx, cy){
      if(cx=== 0 && cy!== 0){
        if(cy> 0){
          return [1, 0];  
        }
        if(cy< 0){
          return [-1, 0]
        } 
      }
      if(cy=== 0 && cx!== 0){
        if(cx> 0){
          return [0, 1];  
        }
        if(cy< 0){
          return [0, -1]
        } 
      }
      return [cy, cx] 
    },
    resize(){
      this.STATIC.camera.aspect = window.innerWidth / window.innerHeight;
      this.STATIC.camera.updateProjectionMatrix();
      this.STATIC.renderer.setSize( window.innerWidth, window.innerHeight );
    },
  },

  data: function(){
    return {
      STATIC:{
        _isVue: true,
        renderer: null,
        camera: null,
        mousedown: null,
        click: null,
        mousemove: null,
      }
    }
  },
  computed: {
    head_svg_width: function(){
      return this.WIDTH< 500? 61.8: 20; 
    }
  },
  watch: {
    WIDTH: function(){
      this.resize();
    }
  },
}
</script>

<style scoped>
input{
  height: 80px;
  font-size: 28px;
  border-radius: 10px 0 0 10px;
}
.iconfont{
  color: #fff;
  font-size: 48px;
}
/*头部轮播区*/
.home-fir{
  line-height: 0;
}
.container img{
  width:750px;
  height:422px;
}
</style>
