import * as base58 from 'bs58';
import { BigNumber } from 'bignumber.js';
import { toBase64 } from '@cosmjs/encoding';

export const utf16_to_b64 = (str: string) => {
	return Buffer.from(str, 'utf8').toString('base64');
};

export const file_to_b64 = (file: File): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = error => reject(error);
	});
};

export const b58_to_b64 = (str: string): string => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return base58.decode(str).toString('base64');
};

export const b58_to_uint8Arr = (str: string): Uint8Array => {
	return base58.decode(str);
};

export const uint8Arr_to_b64 = (array: Uint8Array): string => {
	return toBase64(array);
};

export const getMicroAmount = (amount: string): string => {
	return new BigNumber(amount).times(new BigNumber(10).pow(6)).toString();
};

export const strToArray = (str: string): Uint8Array => {
	const ret = new Uint8Array(Buffer.from(str));
	return ret;
};

const Utf8ArrayToStr = (array: Uint8Array) => {
	let out, i, c;
	let char2, char3;

	out = '';
	const len = array.length;
	i = 0;
	while (i < len) {
		c = array[i++];
		switch (c >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				// 0xxxxxxx
				out += String.fromCharCode(c);
				break;
			case 12:
			case 13:
				// 110x xxxx   10xx xxxx
				char2 = array[i++];
				out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
				break;
			case 14:
				// 1110 xxxx  10xx xxxx  10xx xxxx
				char2 = array[i++];
				char3 = array[i++];
				out += String.fromCharCode(((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0));
				break;
		}
	}

	return out;
};

export const uint8ArrayToStr = (data: Uint8Array): string => {
	const decodedData = Utf8ArrayToStr(data);
	return decodedData;
};
