import { VideoStyle } from '@/types';

export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  styleModifier: string;
  referenceImage: string;
}

export const ART_STYLES: ArtStyle[] = [
  {
    id: 'realistic',
    name: '真实风格',
    description: '照片级真实效果，栩栩如生',
    styleModifier: 'photorealistic, hyperrealistic, detailed, 8k',
    referenceImage: '/art-style-images/realistic.png',
  },
  {
    id: 'comic',
    name: '美漫风格',
    description: '美国漫画风格，动感十足',
    styleModifier: 'comic book style, Marvel comics, dynamic, bold lines',
    referenceImage: '/art-style-images/comic.png',
  },
  {
    id: 'rick-morty',
    name: '瑞克与莫蒂',
    description: '搞怪科幻动画风格',
    styleModifier: 'Rick and Morty style, adult swim animation, cartoon, surreal',
    referenceImage: '/art-style-images/rick-morty.png',
  },
  {
    id: 'anime',
    name: '日系动漫',
    description: '日本动画风格，唯美精致',
    styleModifier: 'anime style, Studio Ghibli, beautiful, vibrant colors',
    referenceImage: '/art-style-images/anime.png',
  },
  {
    id: 'pixel',
    name: '像素风格',
    description: '复古像素艺术，怀旧感',
    styleModifier: 'pixel art, 8-bit, retro game, Nintendo style',
    referenceImage: '/art-style-images/pixel.png',
  },
  {
    id: 'watercolor',
    name: '水彩风格',
    description: '清新水彩画，文艺浪漫',
    styleModifier: 'watercolor painting, artistic, soft colors, dreamy',
    referenceImage: '/art-style-images/watercolor.png',
  },
  {
    id: 'oil-painting',
    name: '油画风格',
    description: '古典油画质感，厚重浓郁',
    styleModifier: 'oil painting, classical art, rich textures, masterpiece',
    referenceImage: '/art-style-images/oil-painting.png',
  },
  {
    id: 'cyberpunk',
    name: '赛博朋克',
    description: '未来科技感，霓虹绚丽',
    styleModifier: 'cyberpunk, neon lights, futuristic, sci-fi, Blade Runner',
    referenceImage: '/art-style-images/cyberpunk.png',
  },
];

export const VIDEO_STYLES: VideoStyle[] = [
  {
    id: 'fortune-god',
    name: '财神到',
    description: '扮演财神爷，手捧金元宝，喜气洋洋',
    referenceImage: '/style-images/fortune-god.png',
    promptTemplate: '人物穿着红色财神服装，头戴财神帽，{action}，面带微笑，背景是热闹的春节场景，红灯笼、鞭炮、春联，嘴里说着："财神到！恭喜发财！祝您新年财源滚滚！"',
    characterAction: '双手捧着金元宝向观众展示',
    dialogue: '财神到！恭喜发财！祝您新年财源滚滚！',
  },
  {
    id: 'lion-dance',
    name: '舞狮拜年',
    description: '舞狮表演，热闹喜庆',
    referenceImage: '/style-images/lion-dance.png',
    promptTemplate: '人物参与舞狮表演，{action}，热闹喜庆，背景有舞狮队、锣鼓、红色装饰，嘴里说着："舞狮来拜年！祝您新春大吉！万事如意！"',
    characterAction: '模仿狮子摇头晃脑，做出拜年的动作',
    dialogue: '舞狮来拜年！祝您新春大吉！万事如意！',
  },
  {
    id: 'family-reunion',
    name: '阖家团圆',
    description: '温馨家庭聚餐，共享年夜饭',
    referenceImage: '/style-images/family-reunion.png',
    promptTemplate: '人物坐在年夜饭餐桌旁，{action}，温馨团圆，桌上摆满美食、饺子、鱼，嘴里说着："阖家团圆！新年快乐！祝大家身体健康！"',
    characterAction: '举杯向家人和观众敬酒祝福',
    dialogue: '阖家团圆！新年快乐！祝大家身体健康！',
  },
  {
    id: 'fireworks',
    name: '烟花秀',
    description: '绚丽烟花下的浪漫祝福',
    referenceImage: '/style-images/fireworks.png',
    promptTemplate: '人物站在烟花下，{action}，背景是绚丽的烟花绽放，夜空五彩斑斓，嘴里说着："烟花灿烂！愿新年，胜旧年！梦想成真！"',
    characterAction: '仰望烟花，双手合十许下新年愿望',
    dialogue: '烟花灿烂！愿新年，胜旧年！梦想成真！',
  },
  {
    id: 'calligraphy',
    name: '挥春送福',
    description: '写春联送祝福，书香门第',
    referenceImage: '/style-images/calligraphy.png',
    promptTemplate: '人物手持毛笔书写春联，{action}，文质彬彬，背景有红纸、墨宝、书香气息，嘴里说着："挥春送福！福到啦！祝您吉祥如意！"',
    characterAction: '写下福字，然后向观众展示',
    dialogue: '挥春送福！福到啦！祝您吉祥如意！',
  },
  {
    id: 'funny-dancing',
    name: '搞怪跳舞',
    description: '跳一段魔性的拜年舞',
    referenceImage: '/style-images/funny-dancing.png',
    promptTemplate: '人物在红色喜庆背景前，{action}，搞笑夸张，充满喜感，嘴里说着："给大家跳个拜年舞！新年快乐！恭喜发财！"',
    characterAction: '跳一段极其魔性搞笑的舞蹈，动作夸张',
    dialogue: '给大家跳个拜年舞！新年快乐！恭喜发财！',
  },
  {
    id: 'funny-eating',
    name: '吃货拜年',
    description: '疯狂吃年夜饭的搞笑场景',
    referenceImage: '/style-images/funny-eating.png',
    promptTemplate: '人物坐在年夜饭桌前，{action}，狼吞虎咽，搞笑夸张，嘴里说着："过年就要吃好喝好！祝大家年年有余！"',
    characterAction: '疯狂往嘴里塞饺子，腮帮子鼓鼓的',
    dialogue: '过年就要吃好喝好！祝大家年年有余！',
  },
  {
    id: 'funny-kungfu',
    name: '功夫拜年',
    description: '用功夫的方式搞笑拜年',
    referenceImage: '/style-images/funny-kungfu.png',
    promptTemplate: '人物摆出各种搞笑功夫姿势，{action}，背景是喜庆的春节场景，嘴里说着："功夫拜年！祝您龙年大吉！步步高升！"',
    characterAction: '打出一套乱七八糟但很有气势的拳法',
    dialogue: '功夫拜年！祝您龙年大吉！步步高升！',
  },
  {
    id: 'funny-singing',
    name: '神曲拜年',
    description: '激情演唱拜年歌曲',
    referenceImage: '/style-images/funny-singing.png',
    promptTemplate: '人物拿着话筒，{action}，表情夸张，充满激情，嘴里唱着："恭喜恭喜恭喜你呀！新年好呀新年好！"',
    characterAction: '闭着眼睛，深情并茂地演唱，手势夸张',
    dialogue: '恭喜恭喜恭喜你呀！新年好呀新年好！',
  },
  {
    id: 'funny-sleep',
    name: '睡梦中拜年',
    description: '睡着觉也不忘拜年',
    referenceImage: '/style-images/funny-sleep.png',
    promptTemplate: '人物躺在床上，{action}，呼呼大睡但说着梦话拜年，嘴里说着梦话："嗯...新年快乐...红包拿来...呼噜噜..."',
    characterAction: '躺在床上，盖着红色被子，流着口水说梦话',
    dialogue: '嗯...新年快乐...红包拿来...呼噜噜...',
  },
  {
    id: 'funny-magic',
    name: '魔术拜年',
    description: '变个魔术来拜年',
    referenceImage: '/style-images/funny-magic.png',
    promptTemplate: '人物穿着魔术师服装，{action}，做出各种搞笑的魔术动作，嘴里说着："变个魔术送祝福！祝您新年快乐！心想事成！"',
    characterAction: '从帽子里掏出一串红包，结果掉了一地',
    dialogue: '变个魔术送祝福！祝您新年快乐！心想事成！',
  },
  {
    id: 'funny-cat',
    name: '猫咪拜年',
    description: '模仿猫咪卖萌拜年',
    referenceImage: '/style-images/funny-cat.png',
    promptTemplate: '人物模仿猫咪的样子，{action}，卖萌可爱，搞笑有趣，嘴里喵喵叫着："喵~喵~新年好喵~祝您万事如意喵~"',
    characterAction: '双手做成猫爪，喵喵叫，还蹭蹭桌子',
    dialogue: '喵~喵~新年好喵~祝您万事如意喵~',
  },
];

export function getStyleById(id: string): VideoStyle | undefined {
  return VIDEO_STYLES.find(style => style.id === id);
}

export function getArtStyleById(id: string): ArtStyle | undefined {
  return ART_STYLES.find(style => style.id === id);
}

export function buildPrompt(style: VideoStyle, artStyle?: ArtStyle): string {
  let basePrompt = style.promptTemplate.replace('{action}', style.characterAction);
  if (artStyle) {
    basePrompt = `${basePrompt}, ${artStyle.styleModifier}`;
  }
  return `${basePrompt} --duration 5 --camerafixed false --watermark true`;
}
