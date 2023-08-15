"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[657],{7657:function(n,e,t){t.r(e),t.d(e,{default:function(){return I}});var r=t(9439),a=t(7948),o=t.n(a),c="ConfirmationModal_modal__LKw6q",i="ConfirmationModal_textModal__eGb1b",u="ConfirmationModal_btnModalWrap__mkl0l",l="ConfirmationModal_btnModal__JG5IA",s="ConfirmationModal_modalConfirm__1ob8Z",f="ConfirmationModal_modalCancel__4doLw",m=t(184),d=function(n){var e=n.isOpen,t=n.onRequestClose,r=n.onDelete;return(0,m.jsxs)(o(),{isOpen:e,onRequestClose:t,contentLabel:"Delete Confirmation",className:c,children:[(0,m.jsxs)("p",{className:i,children:["Are you sure you want ",(0,m.jsx)("br",{}),"to delete this contact?"]}),(0,m.jsxs)("div",{className:u,children:[(0,m.jsxs)("button",{className:l,onClick:r,children:[(0,m.jsx)("span",{className:s,children:"Confirm"})," "]}),(0,m.jsxs)("button",{className:l,onClick:t,children:[" ",(0,m.jsx)("span",{className:f,children:"Cancel"})," "]})]})]})},p="ContactList_contactList__UFVCg",v="ContactList_item__EZYHO",h="ContactList_contactText__mBjoQ",x="ContactList_btnRemove__PnhLM",_=function(n){var e=n.contacts,t=n.onRemoveContacts;return(0,m.jsx)("ul",{className:p,children:e.map((function(n){return(0,m.jsxs)("li",{className:v,children:[(0,m.jsxs)("p",{className:h,children:[n.name,": ",n.number]}),(0,m.jsx)("button",{onClick:function(){return t(n.id)},className:x,"aria-label":"Delete contact",children:"\xd7"})]},n.id)}))})},C="Filter_filterInput__1Cysk",y=t(9434),j=t(9008),b=function(n){var e=n.valueFilter,t=(0,y.I0)();return(0,m.jsx)("input",{type:"text",name:"filter",className:C,value:e,pattern:"^[a-zA-Z\u0430-\u044f\u0410-\u042f]+(([' -][a-zA-Z\u0430-\u044f\u0410-\u042f ])?[a-zA-Z\u0430-\u044f\u0410-\u042f]*)*$",title:"Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",onChange:function(n){t((0,j.jX)(n.target.value))}})},N="FormAddContacts_formAddContacts__hxLv9",g="FormAddContacts_btnAddContact__tvsHN",A=function(){var n=(0,y.v9)(j.xm),e=(0,y.I0)();return(0,m.jsxs)("form",{onSubmit:function(t){t.preventDefault();var r=t.currentTarget,a=r.elements.contactName.value,o=r.elements.contactNumber.value;if(n.some((function(n){return n.name===a})))return alert("Contact with name ".concat(a," already exists "));e((0,j.je)({name:a,number:o})),r.reset()},className:N,children:[(0,m.jsxs)("label",{children:[(0,m.jsx)("p",{children:"Name"}),(0,m.jsx)("input",{name:"contactName",type:"text",required:!0})]}),(0,m.jsxs)("label",{children:[(0,m.jsx)("p",{children:"Number"}),(0,m.jsx)("input",{name:"contactNumber",type:"text",required:!0})]}),(0,m.jsx)("button",{className:g,type:"submit",children:"Add contact"})]})},k=t(6673),w=t(2791),L=t(7561),F="NOT_FOUND";var M=function(n,e){return n===e};function q(n,e){var t="object"===typeof e?e:{equalityCheck:e},r=t.equalityCheck,a=void 0===r?M:r,o=t.maxSize,c=void 0===o?1:o,i=t.resultEqualityCheck,u=function(n){return function(e,t){if(null===e||null===t||e.length!==t.length)return!1;for(var r=e.length,a=0;a<r;a++)if(!n(e[a],t[a]))return!1;return!0}}(a),l=1===c?function(n){var e;return{get:function(t){return e&&n(e.key,t)?e.value:F},put:function(n,t){e={key:n,value:t}},getEntries:function(){return e?[e]:[]},clear:function(){e=void 0}}}(u):function(n,e){var t=[];function r(n){var r=t.findIndex((function(t){return e(n,t.key)}));if(r>-1){var a=t[r];return r>0&&(t.splice(r,1),t.unshift(a)),a.value}return F}return{get:r,put:function(e,a){r(e)===F&&(t.unshift({key:e,value:a}),t.length>n&&t.pop())},getEntries:function(){return t},clear:function(){t=[]}}}(c,u);function s(){var e=l.get(arguments);if(e===F){if(e=n.apply(null,arguments),i){var t=l.getEntries(),r=t.find((function(n){return i(n.value,e)}));r&&(e=r.value)}l.put(arguments,e)}return e}return s.clearCache=function(){return l.clear()},s}function E(n){var e=Array.isArray(n[0])?n[0]:n;if(!e.every((function(n){return"function"===typeof n}))){var t=e.map((function(n){return"function"===typeof n?"function "+(n.name||"unnamed")+"()":typeof n})).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+t+"]")}return e}function O(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),r=1;r<e;r++)t[r-1]=arguments[r];var a=function(){for(var e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];var o,c=0,i={memoizeOptions:void 0},u=r.pop();if("object"===typeof u&&(i=u,u=r.pop()),"function"!==typeof u)throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof u+"]");var l=i,s=l.memoizeOptions,f=void 0===s?t:s,m=Array.isArray(f)?f:[f],d=E(r),p=n.apply(void 0,[function(){return c++,u.apply(null,arguments)}].concat(m)),v=n((function(){for(var n=[],e=d.length,t=0;t<e;t++)n.push(d[t].apply(null,arguments));return o=p.apply(null,n)}));return Object.assign(v,{resultFunc:u,memoizedResultFunc:p,dependencies:d,lastResult:function(){return o},recomputations:function(){return c},resetRecomputations:function(){return c=0}}),v};return a}var R=O(q),z=R([function(n){return n.contacts.contacts},function(n){return n.contacts.filter}],(function(n,e){return e?n.filter((function(n){return n.name.toLowerCase().includes(e.toLowerCase())})):n})),I=function(){var n=(0,y.v9)(L.XI),e=(0,y.v9)(j.xm),t=(0,y.v9)(j.Cc),a=(0,y.v9)(j.Uv),o=(0,y.v9)(j.vp),c=(0,y.v9)(z),i=(0,y.I0)();(0,w.useEffect)((function(){n&&i((0,j.GY)())}),[n,i]);var u=(0,w.useState)(null),l=(0,r.Z)(u,2),s=l[0],f=l[1],p=Array.isArray(e)&&e.length>0;return(0,m.jsxs)("section",{children:[(0,m.jsx)(d,{isOpen:null!==s,onRequestClose:function(){return f(null)},onDelete:function(){null!==s&&(i((0,j.xX)(s)),f(null))}}),(0,m.jsx)(A,{}),(0,m.jsxs)("div",{children:[t&&(0,m.jsx)(k.Z,{}),a&&(0,m.jsxs)("p",{children:["Error: ",a]}),(0,m.jsx)("h2",{children:"Find contacts by name"}),(0,m.jsx)(b,{valueFilter:o}),(0,m.jsx)("h2",{children:"Your contacts list"}),p&&(""===o?(0,m.jsx)(_,{contacts:e,onRemoveContacts:function(n){return function(n){f(n)}(n)}}):(0,m.jsx)(_,{contacts:c}))]})]})}}}]);
//# sourceMappingURL=657.0a01ce6d.chunk.js.map