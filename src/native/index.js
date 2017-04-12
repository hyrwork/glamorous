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
        this.cachedStyles = {}
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
        const mergedStyles = {
          ...glamorousStyles,
          ...styleProps,
        }
        const index = JSON.stringify(mergedStyles)
        let cachedStyleNumber = null
        if (index in this.cachedStyles) {
          cachedStyleNumber = this.cachedStyles[index]
        } else {
          cachedStyleNumber = StyleSheet.create({key: mergedStyles}).key
          this.cachedStyles[index] = cachedStyleNumber
        }
        console.log(cachedStyleNumber)
        return <Comp style={[cachedStyleNumber, style]} {...toForward} />
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

const RNStyles = [
  'width',
  'height',
  'top',
  'left',
  'right',
  'bottom',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'margin',
  'marginVertical',
  'marginHorizontal',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'padding',
  'paddingVertical',
  'paddingHorizontal',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'position',
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'alignSelf',
  'overflow',
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'aspectRatio',
  'zIndex',
  'shadowOpacity',
  'shadowRadius',
  'decomposedMatrix',
  'scaleX',
  'scaleY',
  'rotation',
  'translateX',
  'translateY',
  'backfaceVisibility',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderStyle',
  'opacity',
  'elevation',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'fontVariant',
  'textShadowOffset',
  'textShadowRadius',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textAlignVertical',
  'includeFontPadding',
  'textDecorationLine',
  'textDecorationStyle',
  'writingDirection',
  'resizeMode',
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
