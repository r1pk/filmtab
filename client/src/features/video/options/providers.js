export const providers = [
  { name: 'youtube', regexp: /((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+/ },
  { name: 'vimeo', regexp: /vimeo\.com\/(?!progressive_redirect).+/ },
  { name: 'html5', regexp: /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i },
  { name: 'html5', regexp: /^(https:\/\/www\.googleapis\.com\/drive\/v3\/files\/)/ },
];
