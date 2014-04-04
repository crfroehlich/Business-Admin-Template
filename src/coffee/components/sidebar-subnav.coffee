(() ->

  subNav = (owner, props) ->
    defaults:
      active: ''
      menu: [
        {
          name: ''
          href: ''
        }
      ]
  
    Dre.extend defaults, props
  
    ret = Dre.component(owner, 'dre-sidebar-subnav')
    ul = ret.ul  attr:
      class: 'animated fadeIn'

    Dre.each defaults.menu, (val, key) ->
      if val.name is defaults.active
        li = ul.li attr:
          class: 'active'
      else
        li = ul.li
      li.a attr:
        href: val.href
        .text val.name
      return
                
)()