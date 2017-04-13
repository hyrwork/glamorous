import React, {Component} from 'react'
import {
  View,
  Image,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native'
// import ThemeProvider, {CHANNEL} from './theme-provider'

/**
 * This the React Native Glamorous Implementation
 *
 * It accepts a component which can be a string or a React Component and returns
 * a "glamorousComponentFactory"
 * @param {String|ReactComponent} Comp the component to render
 * @return {Function} the glamorousComponentFactory
 */
function glamorous(Comp) {
  return glamorousComponentFactory
  /**
     * This returns a React Component that renders the comp (closure)
     * with the given glamor styles object(s)
     * @param {...Object|Function} glamorousStyles the styles to create with glamor.
     *   If any of these are functions, they are invoked with the component
     *   props and the return value is used.
     * @return {ReactComponent} the ReactComponent function
     */
  function glamorousComponentFactory(glamorousStyles) {
    /**
         * This is a component which will render the comp (closure)
         * with the glamorous styles (closure). Forwards any valid
         * props to the underlying component.
         * @param {Object} theme the theme object
         * @return {ReactElement} React.createElement
         */
    class GlamorousComponent extends Component {
      // state = {theme: null}
      // setTheme = theme => this.setState({theme})

      componentWillMount() {
        // const {theme} = this.props
        // if (this.context[CHANNEL]) {
        //     // if a theme is provided via props, it takes precedence over context
        //     this.setTheme(theme ? theme : this.context[CHANNEL].getState())
        // } else {
        //     this.setTheme(theme || {})
        // }
      }

      componentWillReceiveProps(nextProps) {
        // if (this.props.theme !== nextProps.theme) {
        //     this.setTheme(nextProps.theme)
        // }
      }

      componentDidMount() {
        // if (this.context[CHANNEL] && !this.props.theme) {
        //     // subscribe to future theme changes
        //     this.unsubscribe = this.context[CHANNEL].subscribe(this.setTheme)
        // }
      }

      componentWillUnmount() {
        // // cleanup subscription
        // this.unsubscribe && this.unsubscribe()
      }

      render() {
        const {...rest} = this.props
        const {
          toForward,
          styleProps,
          style,
        } = splitProps(rest)
        const staticStyles = {
          ...glamorousStyles,
          ...styleProps,
        }
        console.log(this.cachedStylesNumber)
        this.cachedStylesNumber = this.cachedStylesNumber ||
          StyleSheet.create({key: staticStyles}).key
        const mergedStyles = Array.isArray(style) ?
          [this.cachedStylesNumber, ...style] :
          [this.cachedStylesNumber, style]
        return <Comp style={mergedStyles} {...toForward} />
      }
    }

    // GlamorousComponent.propTypes = {
    //     theme: PropTypes.object,
    // }

    // GlamorousComponent.contextTypes = {
    //     [CHANNEL]: PropTypes.object,
    // }

    return GlamorousComponent
  }
}

glamorous.View = glamorous(View)
glamorous.Image = glamorous(Image)
glamorous.ListView = glamorous(ListView)
glamorous.ScrollView = glamorous(ScrollView)
glamorous.Text = glamorous(Text)
glamorous.TouchableHighlight = glamorous(TouchableHighlight)
glamorous.TouchableNativeFeedback = glamorous(TouchableNativeFeedback)
glamorous.TouchableOpacity = glamorous(TouchableOpacity)
glamorous.TouchableWithoutFeedback = glamorous(TouchableWithoutFeedback)

/**
 * should-forward-native-property substitute
 */

// This list is not complete. View and Text styles only.
const RNStyles = [
  'alignItems',
  'alignSelf',
  'backfaceVisibility',
  'backgroundColor',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomWidth',
  'borderColor',
  'borderLeftColor',
  'borderLeftWidth',
  'borderRadius',
  'borderRightColor',
  'borderRightWidth',
  'borderStyle',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'color',
  'decomposedMatrix',
  'elevation',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'height',
  'justifyContent',
  'left',
  'letterSpacing',
  'lineHeight',
  'margin',
  'marginBottom',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'opacity',
  'overflow',
  'overlayColor',
  'padding',
  'paddingBottom',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingVertical',
  'position',
  'resizeMode',
  'right',
  'rotation',
  'scaleX',
  'scaleY',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'textAlign',
  'textAlignVertical',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationStyle',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'tintColor',
  'top',
  'transform',
  'transformMatrix',
  'translateX',
  'translateY',
  'width',
  'writingDirection',
  'zIndex',
]

const hasItem = (list, name) => list.indexOf(name) !== -1
const isRNStyle = name => hasItem(RNStyles, name)

function splitProps({style, ...rest}) {
  const returnValue = {toForward: {}, styleProps: {}, style}
  return Object.keys(rest).reduce(
    (split, propName) => {
      if (isRNStyle(propName)) {
        split.styleProps[propName] = rest[propName]
      } else {
        split.toForward[propName] = rest[propName]
      }
      console.log(split)
      return split
    },
    returnValue,
  )
}

export default glamorous
// export {ThemeProvider}
