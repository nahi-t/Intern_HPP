'use client';

import { useState, useEffect } from 'react';
import { getHeroData } from '@/lib/cmsapi';
import { HERO_CONTENT } from '@/constants/homeConstants';

interface HeroData {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  backgroundImages: string[];
}

export const useHeroData = () => {
  const [data, setData] = useState<HeroData>({
    ...HERO_CONTENT,
    backgroundImages: [HERO_CONTENT.backgroundImage],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeroData()
      .then((res) => {
        if (res?.data) {
          const newData: HeroData = {
            titleLine1: res.data.titleLine1 || HERO_CONTENT.titleLine1,
            titleLine2: res.data.titleLine2 || HERO_CONTENT.titleLine2,
            subtitle: res.data.subtitle || HERO_CONTENT.subtitle,
            primaryButton: HERO_CONTENT.primaryButton,
            secondaryButton: HERO_CONTENT.secondaryButton,
            backgroundImages: Array.isArray(res.data.backgroundImages)
              ? res.data.backgroundImages
              : [res.data.backgroundImages || HERO_CONTENT.backgroundImage],
          };
          setData(newData);
        }
      })
      .catch((err) => console.error('Error:', err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
