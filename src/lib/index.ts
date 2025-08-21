import { PUBLIC_PB_ADDR } from '$env/static/public';
import Pocketbase from 'pocketbase';

export const pb = new Pocketbase(PUBLIC_PB_ADDR);
