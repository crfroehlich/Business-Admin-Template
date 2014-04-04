(() ->

  thisGlobal = (typeof global isnt 'undefined' && global ? global : typeof window isnt 'undefined' ? window : this)
  Doc = thisGlobal.OJ
  
  thisGlobal.Doc = Doc
)()