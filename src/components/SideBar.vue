<template>
  <div class="bgm-index-nav">
    <div class="special_selector">
      <div class="special_mbox">
        <div class="left">
          <span>类型</span>
        </div>

        <div>
          <a href="javascript:;" @click="filter($event, 'subtype')" data-value="all" class="tab-i ckc on">全部</a>
          <a href="javascript:;" @click="filter($event, 'subtype')" data-value="tv" class="tab-i ckc">TV</a>
          <a href="javascript:;" @click="filter($event, 'subtype')" data-value="special" class="tab-i ckc">特别版</a>
          <a href="javascript:;" @click="filter($event, 'subtype')" data-value="ona" class="tab-i ckc">ONA</a>
          <a href="javascript:;" @click="filter($event, 'subtype')" data-value="ova" class="tab-i ckc">OVA</a>
          <a href="javascript:;" @click="filter($event, 'subtype')" data-value="movie" class="tab-i ckc">电影</a>
          <a href="javascript:;" @click="filter($event, 'subtype')" data-value="music" class="tab-i ckc">音乐</a>
        </div>

      </div>

      <div class="special_mbox">
        <div class="left">
          <span>时间</span>
        </div>
        <div class="right tab_year">
          <a href="javascript:;" @click="filter($event, 'year')" data-value="all" class="tab-i ckc on">全部</a>
          <a v-for="idx of 50" :key="idx" href="javascript:;" @click="filter($event, 'year')" class="tab-i ckc" 
          :data-value="(currentYear - idx + 1) + '..' + (currentYear - idx + 1)">{{currentYear - idx + 1}}</a>
        </div>
      </div>

      <div class="special_mbox">
        <div class="left">
          季度
        </div>

        <div class="right tab_update">
          <a href="javascript:;" @click="filter($event, 'season')" data-value="all" class="tab-i ckc on">全部</a>
          <a href="javascript:;" @click="filter($event, 'season')" data-value="spring" class="tab-i ckc">春季</a>
          <a href="javascript:;" @click="filter($event, 'season')" data-value="summer" class="tab-i ckc">夏季</a>
          <a href="javascript:;" @click="filter($event, 'season')" data-value="fall" class="tab-i ckc">秋季</a>
          <a href="javascript:;" @click="filter($event, 'season')" data-value="winter" class="tab-i ckc">冬季</a>
        </div>

      </div>

      <div class="special_mbox">
        <div class="left">
          <span>主题</span>
        </div>
        <div class="right tab_style">
          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc on" data-value="all">全部</a>

          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc" data-value="cooking">美食</a>

          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc" data-value="crime">犯罪</a>

          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc" data-value="daily-life">日常</a>

          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc" data-value="disaster">灾难</a>

          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc" data-value="friendship">友情</a>

          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc" data-value="military">军事</a>

          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc" data-value="school-life">校园</a>

          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc" data-value="sports">运动</a>

          <a href="javascript:;" @click="filter($event, 'categories')" class="tab-i ckc" data-value="the-arts">艺术</a>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      params: {
        "sort": "-userCount",
        "fields[anime]": "titles,posterImage",
      },
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    filter(event, type) {
      let ele = event.currentTarget
      let list = ele.parentNode.children
      let value = ele.dataset.value
      for (let i = 0; i < list.length; i ++) {
        if (list[i].dataset.value === value) {
          ele.classList.add("on")
        } else {
          list[i].classList.remove("on")
        }
      }

      if (value === 'all') 
       delete this.params['filter[' + type + ']']
      else 
       this.params['filter[' + type + ']'] = value

      this.params["page[offset]"] = 0
      this.params["page[limit]"] = 20
      this.$parent.getAnimes(this.params, true)
    }
  }
};
</script>

<style scoped>
.bgm-index-nav {
  /* position: absolute; */
  top: 0;
  width: 260px;
  padding-top: 40px;
}

.bgm-index-nav .special_selector {
  width: 100%;
  border: none;
  margin: 0;
  height: auto;
  overflow: hidden;
}

.bgm-index-nav .special_selector .special_mbox {
  zoom: 1;
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
}

.bgm-index-nav .special_selector .special_mbox .height-trigger {
  position: absolute;
  width: 38px;
  height: 18px;
  border: 1px solid #ccd0d7;
  font-size: 12px;
  color: #99a2aa;
  border-radius: 4px;
  text-align: center;
  line-height: 18px;
  bottom: 14px;
  right: 18px;
  background: #fff;
}

.bgm-index-nav .special_selector .special_mbox .height-trigger:hover {
  cursor: pointer;
  color: #00a1d6;
  border-color: #00a1d6;
}

.bgm-index-nav .special_selector .special_mbox .height-trigger:before {
  display: block;
  position: absolute;
  top: -1px;
  right: -31px;
  width: 30px;
  height: 20px;
  z-index: 0;
  background: #fff;
}

.bgm-index-nav .special_selector .special_mbox .left {
  width: 52px;
  height: 36px;
  line-height: 1;
  font-size: 12px;
  color: #99a2aa;
}

.bgm-index-nav .special_selector .special_mbox .right {
  width: 208px;
  float: left;
  overflow: hidden;
  transition: 0.3s linear;
  transition-property: max-height, height;
}

.bgm-index-nav .special_selector .special_mbox .right.tab_style {
  max-height: 300px;
}

.bgm-index-nav .special_selector a.ckc {
  display: block;
  float: left;
  line-height: 1;
  color: #222;
  text-align: left;
  width: 52px;
  height: 30px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bgm-index-nav .special_selector a.ckc.disable {
  background-color: #fcfcfc;
  border-color: #fcfcfc;
  color: #bbb;
}

.bgm-index-nav .special_selector a.ckc.on,
.bgm-index-nav .special_selector a.ckc:hover {
  color: #00a1d6;
}

li.empty {
  height: 188px;
}

li.hidden {
  display: none;
}

.v_list {
  overflow: hidden;
  padding: 40px 0;
}

.v_list .v_sort {
  color: #222;
  font-size: 14px;
  line-height: 1;
  height: 14px;
  margin-bottom: 30px;
  position: relative;
}

.v_list .v_sort a {
  display: inline-block;
  color: #222;
  width: 80px;
  margin-right: 20px;
  position: relative;
}

.v_list .v_sort a.on,
.v_list .v_sort a:hover {
  color: #00a1d6;
}

.v_list .v_sort a:before {
  content: "";
  display: block;
  position: absolute;
  left: 60px;
  margin: 0 2px;
  top: 0;
  width: 0;
  height: 0;
  border: 5px dashed #ddd;
  border-bottom-style: solid;
  border-top: none;
  border-left-color: transparent;
  border-right-color: transparent;
}

.v_list .v_sort a:after {
  content: "";
  display: block;
  position: absolute;
  left: 60px;
  margin: 0 2px;
  bottom: 0;
  width: 0;
  height: 0;
  border: 5px dashed #ddd;
  border-top-style: solid;
  border-bottom: none;
  border-left-color: transparent;
  border-right-color: transparent;
}

.v_list .v_sort a.on.asc:before {
  border-color: #00a1d6 transparent;
  border-top: none;
}

.v_list .v_sort a.on.desc:after {
  border-color: #00a1d6 transparent;
  border-bottom: none;
}

.v_list .v_sort .loading {
  position: absolute;
  right: 36px;
  top: 22px;
  color: #99a2aa;
}

.v_list .v_ul {
  overflow: hidden;
  margin-bottom: 10px;
  min-height: 608px;
}

.v_list .v_ul li {
  float: left;
  margin-right: 20px;
}

.v_list .v_ul li .preview {
  position: relative;
  overflow: hidden;
}

.v_list .v_ul li .preview:hover {
  transition: all 0.3s linear;
  border-color: #c2c2c2;
}

.v_list .v_ul li .preview .cover {
  overflow: hidden;
  border-radius: 5px;
  width: 160px;
}

.v_list .v_ul li .preview .cover a {
  display: block;
  position: relative;
}

.v_list .v_ul li .preview .cover a img {
  width: 160px;
  height: 214px;
}

.v_list .v_ul li .preview .cover a .shadow {
  position: absolute;
  width: 160px;
  color: #fff;
  bottom: 0;
  left: 0;
  height: 50px;
  background: -moz-linear-gradient(
    bottom,
    rgba(0, 0, 0, 0.6) 0,
    transparent 100%
  );
  background: -webkit-gradient(
    linear,
    left bottom,
    bottom bottom,
    color-stop(60%, #000),
    color-stop(100%, transparent)
  );
  background: -webkit-linear-gradient(
    bottom,
    rgba(0, 0, 0, 0.6) 0,
    transparent 100%
  );
  background: -o-linear-gradient(
    bottom,
    rgba(0, 0, 0, 0.6) 0,
    transparent 100%
  );
  background: -ms-linear-gradient(
    bottom,
    rgba(0, 0, 0, 0.6) 0,
    transparent 100%
  );
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0, transparent 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr=#00ffffff,
      endColorstr=#99000000,
      GradientType=0
    );
}

.v_list .v_ul li .preview .cover a .shadow .sort-info {
  position: absolute;
  left: 10px;
  bottom: 10px;
  line-height: 1;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 90%;
  text-overflow: ellipsis;
}

.v_list .v_ul li .preview .cover a .cover_tag_payfast,
.v_list .v_ul li .preview .cover a .cover_tag_payview {
  position: absolute;
  width: 60px;
  height: 24px;
  top: 0;
  right: 0;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  background-color: #ffa726;
  color: #fff;
  border-radius: 0 4px;
}

.v_list .v_ul li .preview .info_wrp {
  display: block;
  width: 160px;
  height: 90px;
  overflow: hidden;
}

.v_list .v_ul li .preview .info {
  position: relative;
  margin-top: 10px;
}

.v_list .v_ul li .preview .info a {
  display: block;
  color: #222;
  max-height: 44px;
  overflow: hidden;
  font-size: 14px;
}

.v_list .v_ul li .preview .info a .after {
  position: absolute;
  width: 12px;
  top: 26px;
  right: -20px;
  background: #fff;
}

.v_list .v_ul li .preview .info a:hover {
  color: #00a1d6;
}

.v_list .v_ul li .preview .info a .t {
  line-height: 22px;
  max-height: 44px;
  word-break: break-all;
  word-wrap: break-word;
}

.v_list .v_ul li .preview .info .num {
  padding-top: 4px;
  height: 14px;
  font-size: 12px;
  line-height: 12px;
  color: #99a2aa;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v_list .v_ul li .preview .info .num b {
  color: #99a2aa;
}

.v_list .v_ul .no-data {
  margin: 8% auto;
  height: 200px;
  color: #99a2aa;
  text-align: center;
  display: block;
  float: none;
  position: relative;
  font-size: 14px;
}

.v_list .v_ul .no-data span {
  position: absolute;
  bottom: -30px;
  left: 50%;
  margin-left: -88px;
}

.v_list .v_ul .no-data-filter span {
  position: absolute;
  bottom: 70px;
  left: 50%;
  margin-left: -80px;
  width: 160px;
  display: inline-block;
  text-align: center;
}

.v_list .v_ul .no-data-filter .reset-btn {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 160px;
  background: #00a1d6;
  color: #fff;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  margin-left: -80px;
}

.pagelistbox .custompage,
.pagelistbox a,
.pagelistbox span,
.pagelistbox strong {
  padding: 0 8px;
}

.left {
  float: left;
}
</style>
