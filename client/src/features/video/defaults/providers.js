export default class Provider {
  constructor(name, pattern) {
    this.name = name;
    this.pattern = pattern;
  }

  getProviderName() {
    return this.name;
  }

  isVideoSupported(url) {
    return typeof url === 'string' && this.pattern.test(url);
  }
}

export const providers = [
  new Provider('youtube', /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/),
  new Provider('vimeo', /vimeo\.com\/(?!progressive_redirect).+/),
  new Provider('html5', /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i),
];
