module.exports = {
  name: 'upaas-simple-button',
  props: {
    text: String,
    className: String
  },
  methods: {
    clickHandler (e) {
      this.$emit('clickHandler', e)
    }
  },
  render (h) {
    return h('a', {
      'class': 'className',
      'on': {
        'click': this.clickHandler
      }
    })
  }
}