import cn from 'classnames/bind'
import PropTypes from 'prop-types'
import React from 'react'

import { getAriaLabel } from '../a11y'
import { getDataset, debounce } from '../utils'
import Tag from '../tag'

import styles from './index.css'

const cx = cn.bind(styles)

const getTags = (tags = [], onDelete, readOnly, disabled, labelRemove) =>
  tags.map(tag => {
    const { _id, label, tagClassName, dataset } = tag
    return (
      <li className={cx('tag-item', tagClassName)} key={`tag-item-${_id}`} {...getDataset(dataset)}>
        <Tag
          label={label}
          id={_id}
          onDelete={onDelete}
          readOnly={readOnly}
          disabled={disabled}
          labelRemove={labelRemove}
        />
      </li>
    )
  })

const createDelayedCallback = callback => debounce(e => callback(e.target.value), 300)

function handleChange(onInputChange) {
  const delayedCallback = createDelayedCallback(onInputChange)
  return e => {
    e.persist()
    delayedCallback(e)
  }
}

const Input = props => {
  const {
    tags,
    onTagRemove,
    inputRef,
    texts,
    onFocus,
    onBlur,
    disabled,
    readOnly,
    onKeyDown,
    activeDescendant,
    onInputChange,
  } = props
  return (
    <ul className={cx('tag-list')}>
      {getTags(tags, onTagRemove, readOnly, disabled, texts.labelRemove)}
      <li className={cx('tag-item')}>
        <input
          type="text"
          disabled={disabled}
          ref={inputRef}
          className={cx('search')}
          placeholder={texts.placeholder || 'Choose...'}
          onKeyDown={onKeyDown}
          onChange={handleChange(onInputChange)}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
          aria-activedescendant={activeDescendant}
          aria-autocomplete={onKeyDown ? 'list' : undefined}
          {...getAriaLabel(texts.label)}
        />
      </li>
    </ul>
  )
}

Input.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  texts: PropTypes.shape({
    labelRemove: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
  }),
  onInputChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onTagRemove: PropTypes.func,
  onKeyDown: PropTypes.func,
  inputRef: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  activeDescendant: PropTypes.string,
}

Input.defaultProps = {
  tags: [],
  texts: {},
  onInputChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onTagRemove: () => {},
  onKeyDown: () => {},
  inputRef: () => {},
  disabled: undefined,
  readOnly: undefined,
  activeDescendant: undefined,
}

export default Input
