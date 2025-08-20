import { PUBLIC_PB_ADDR } from '$env/static/public';
import Pocketbase from 'pocketbase';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const pb = new Pocketbase(PUBLIC_PB_ADDR);

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
