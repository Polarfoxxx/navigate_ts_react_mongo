

export type Type_forAuthentication_API = {
  emailValue: string;
  passwordValue: string | number,
};


export type Type_forInputElemets = {
  emailValue: HTMLInputElement | null,
  passwordValue: HTMLInputElement | null,
  passwordConfrmationValue?: HTMLInputElement | null,
};
