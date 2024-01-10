import PropTypes from 'prop-types';
import styles from './Text.module.css'
import React from 'react';

export const TextAs = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  subtitle: 'subtitle',
  span: 'span'
}
export const TextTone = {
  success: 'success',
  critical: 'critical',
  caution: 'caution',
  base: 'base',
}
export const TextAlignment={
  left:'left',
  center:'center',
  right:'right',
  justify:'justify'
}
export const TextWeight={
  400:'400',
  500:'500',
  600:'600',
  700:'700'
}
export const TextVariant = {

}

const Text = ({ children, As = TextAs.p, tone = TextTone.base, variant,alignment=TextAlignment.left, fontWeight = TextWeight[400], style}) => 
{
  const textAs = styles[`text-${As}`];

  return React.createElement(As, { className: `${styles.text} ${styles[tone]} ${textAs}`, style:{...style,fontWeight:fontWeight, textAlign:alignment} }, children);
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  As: TextAs,
  tone: TextTone,
  variant: PropTypes.string,
  fontWeight: TextWeight,
  style: PropTypes.object,
};

export default Text;