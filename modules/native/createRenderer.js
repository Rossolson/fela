import { StyleSheet } from 'react-native'

import generatePropsReference from '../utils/generatePropsReference'
import processStyle from '../utils/processStyle'

export default function createRenderer(config = { }) {
  let renderer = {
    listeners: [],
    plugins: config.plugins || [ ],

    /**
     * clears the sheet's cache but keeps all listeners
     */
    clear() {
      renderer.rules = { }
      renderer.ids = [ ]
    },

    /**
     * renders a new rule variation and caches the result
     *
     * @param {Function} rule - rule which gets rendered
     * @param {Object?} props - properties used to render
     * @return {Object} style object
     */
    renderRule(rule, props = { }) {
      // rendering a rule for the first time
      // will create an ID reference
      if (renderer.ids.indexOf(rule) < 0) {
        renderer.ids.push(rule)
      }

      // uses the reference ID and the props to generate an unique className
      const ruleId = renderer.ids.indexOf(rule)
      const ref = ruleId + generatePropsReference(props)

      // only if the cached rule has not already been rendered
      // with a specific set of properties it actually renders
      if (!renderer.rules.hasOwnProperty(ref)) {
        const style = processStyle(renderer._resolveStyle(rule, props), {
          type: 'rule',
          id: ruleId,
          props: props,
          rule: rule
        }, renderer.plugins)

        if (Object.keys(style).length > 0) {
          renderer.rules[ref] = StyleSheet.create({
            style: style
          }).style
        } else {
          renderer.rules[ref] = undefined
        }
      }

      return renderer.rules[ref]
    },

    /**
     * Encapsulated style resolving method
     *
     * @param {Function} style - rule or keyframe to be resolved
     * @param {Object} props - props used to resolve style
     * @return {Object} resolved style
     */
    _resolveStyle(style, props) {
      return style(props)
    }
  }

  // initial setup
  renderer.clear()

  // enhance renderer with passed set of enhancers
  if (config.enhancers) {
    config.enhancers.forEach(enhancer => renderer = enhancer(renderer))
  }

  return renderer
}
