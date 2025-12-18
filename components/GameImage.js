'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * 游戏物品图片组件，自动处理 webp/png 格式回退
 * @param {string} slug - 物品的 slug
 * @param {string} alt - 图片的 alt 文本
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 * @param {string} className - 额外的 CSS 类
 * @param {function} onAllFailed - 所有格式都失败时的回调
 */
export default function GameImage({ slug, alt, width = 48, height = 48, className = '', onAllFailed }) {
  const [format, setFormat] = useState('webp'); // 'webp' -> 'png' -> 'error'

  const handleError = () => {
    if (format === 'webp') {
      setFormat('png');
    } else if (format === 'png') {
      setFormat('error');
      onAllFailed?.();
    }
  };

  if (format === 'error') {
    return null;
  }

  return (
    <Image
      src={`/images/items/${slug}.${format}`}
      alt={alt}
      width={width}
      height={height}
      className={`pixelated ${className}`}
      onError={handleError}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
