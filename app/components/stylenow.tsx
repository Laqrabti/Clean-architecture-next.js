export function HELLO() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="p-8 bg-gray-100">
      {/* Outer container for spacing */}
      <div className="space-y-8">
        
        {/* Example 1: Only Padding (internal space) */}
        <div>
          <h3 className="mb-10">1. Only Padding (Internal Space)</h3>
          <div className="bg-fuchsia-600 text-black px-4 py-4 text-center text-border font-semibold mb-8 mt-4 w-32 rounded-md"> 
            {/* `p-6` adds padding INSIDE */}
            Button Text
          </div>
          <p className="text-start font-bold text-gray-600 mt-99">The blue area is the element. Padding pushes the text away from its edges.</p>
        </div>

        {/* Example 2: Only Margin (external space) */}
        <div>
          <h3 className="mb-9">2. Only Margin (External Space)</h3>
          <div className="flex space-x-4">
            <div className="bg-green-500 text-white p-4">Button A</div>
            <div className="bg-red-600 text-white p-4 mx-8"> 
              {/* `mx-8` adds margin OUTSIDE (left & right) */}
              Button B
            </div>
            <div className="bg-green-500 text-white p-4">Button C</div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Margin (`mx-8`) creates empty space between Button B and its neighbors.</p>
        </div>

        {/* Example 3: Both Padding & Margin */}
        <div>
          <h3 className="mb-2">3. Both Padding & Margin</h3>
          <div className="bg-red-500 text-white p-4 m-6"> 
            {/* `p-4` inside, `m-6` outside */}
            Button Text
          </div>
          <p className="text-sm text-gray-600 mt-1">Padding makes the button larger. Margin pushes the entire button away from other elements.</p>
        </div>

      </div>
    </div>
      <div className="flex items-center justify-center gap-6 p-8 bg-gray-100 border rounded-xl">
        
  {/* Button with default padding */}
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Default (px-4 py-2)
  </button>
  
  {/* Button with large padding */}
  <button className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
    Large (px-6 py-3)
  </button>
  
  {/* Button with extra margin-right */}
  <button className="px-4 py-2 mr-8 bg-red-500 text-white rounded hover:bg-red-600">
    Has mr-8 margin
  </button>
  
  {/* Button with no side margins, only top/bottom */}
  <button className="px-5 py-2.5 my-2 bg-purple-500 text-white rounded hover:bg-purple-600">
    Has my-2 margin
  </button>
  
  {/* Extra-small button */}
  <button className="px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600">
    Small (px-2 py-1)
  </button>
</div>
       <div className="p-4 min-h-screen bg-gray-50">
      {/* 1. Responsive Flex Direction & Layout */}
      <div className="mb-8 p-4 border rounded-lg bg-white">
        <h3 className="text-lg font-bold mb-2">1. Responsive Flex Direction</h3>
        {/* Stack vertically on mobile, row on medium+ screens */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="p-4 bg-blue-100 rounded flex-1 text-center">
            Mobile: Column, <strong>MD+: Row</strong>
          </div>
          <div className="p-4 bg-green-100 rounded flex-1 text-center">
            Uses: `flex flex-col md:flex-row`
          </div>
        </div>
      </div>

      {/* 2. Responsive Padding & Spacing */}
      <div className="mb-8 p-4 border rounded-lg bg-white">
        <h3 className="text-lg font-bold mb-2">2. Responsive Padding & Margin</h3>
        {/* Small padding on mobile, larger on desktop */}
        <div className="p-2 md:p-8 bg-yellow-50 border">
          <p>Mobile: `p-2` (0.5rem), <strong>MD+: `p-8` (2rem)</strong></p>
          <div className="mt-4 ml-0 md:ml-8 bg-yellow-100 p-2">
            Margin: `ml-0 md:ml-8`
          </div>
        </div>
      </div>

      {/* 3. Responsive Visibility */}
      <div className="mb-8 p-4 border rounded-lg bg-white">
        <h3 className="text-lg font-bold mb-2">3. Responsive Visibility</h3>
        <div className="flex gap-4">
          {/* Hidden on mobile, visible on medium screens */}
          <div className="hidden md:block p-4 bg-purple-100 rounded text-center flex-1">
            Visible <strong>MD+ only</strong> (`hidden md:block`)
          </div>
          {/* Always visible, changes width */}
          <div className="w-full md:w-1/2 p-4 bg-red-100 rounded text-center">
            Width: `w-full md:w-1/2`
          </div>
        </div>
      </div>

      {/* 4. Responsive Grid */}
      <div className="p-4 border rounded-lg bg-white">
        <h3 className="text-lg font-bold mb-2">4. Responsive Grid Columns</h3>
        {/* 1 column on mobile, 2 on medium, 4 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['A', 'B', 'C', 'D'].map((item) => (
            <div key={item} className="p-4 bg-gray-200 rounded text-center">
              Col `1` → `2` → `4`
            </div>
          ))}
        </div>
      </div>
    </div>
  );
      {/* === HEADER SECTION === */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            UI Component <span className="text-blue-600">Gallery</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            This component demonstrates the <strong className="text-blue-600">4-step framework</strong> applied to various elements. Each element shows its key styling classes in context.
          </p>
        </div>

        {/* === LAYOUT DIVS SECTION === */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            1. Layout Divs & Containers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card Div - Stacked Layout */}
            <div className="
              bg-white p-6 rounded-xl shadow-md border border-gray-100
              hover:shadow-lg transition-shadow duration-300
            ">
              <h3 className="font-bold text-gray-800 mb-3">Stacked Card</h3>
              <p className="text-gray-600 text-sm mb-4">
                Uses: <code>p-6</code> padding, <code>rounded-xl</code> corners, and <code>shadow-md</code>.
              </p>
              <div className="space-y-3">
                <div className="h-3 bg-blue-100 rounded"></div>
                <div className="h-3 bg-blue-100 rounded w-5/6"></div>
              </div>
            </div>

            {/* Flex Div - Horizontal Layout */}
            <div className="
              bg-white p-6 rounded-xl shadow-md border border-gray-100
              hover:shadow-lg transition-shadow duration-300
            ">
              <h3 className="font-bold text-gray-800 mb-3">Flex Container</h3>
              <p className="text-gray-600 text-sm mb-4">
                Uses: <code>flex items-center</code> for horizontal alignment with vertical centering.
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                <div className="w-10 h-10 bg-yellow-500 rounded-full"></div>
                <div className="w-10 h-10 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Grid Div */}
            <div className="
              bg-white p-6 rounded-xl shadow-md border border-gray-100
              hover:shadow-lg transition-shadow duration-300
            ">
              <h3 className="font-bold text-gray-800 mb-3">Grid Container</h3>
              <p className="text-gray-600 text-sm mb-4">
                Uses: <code>grid grid-cols-2 gap-3</code> for a 2-column layout.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className="h-8 bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-xs text-purple-800">Item {num}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === FORM INPUTS SECTION === */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            2. Form Inputs & Validation States
          </h2>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-blue-600 text-xs">(Standard)</span>
                </label>
                <input
                  type="email"
                  className="
                    /* Step 1 & 2: Layout & Spacing */
                    block w-full px-4 py-3
                    /* Step 3: Visual Foundation */
                    border border-gray-300 rounded-lg bg-white text-gray-900
                    /* Step 4: States */
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    placeholder:text-gray-400
                  "
                  placeholder="you@example.com"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Uses <strong>px-4 py-3</strong> padding and <strong>focus:ring-blue-500</strong>
                </p>
              </div>

              {/* Password Input with Error State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-600 text-xs">(Error State)</span>
                </label>
                <input
                  type="password"
                  className="
                    block w-full px-4 py-3
                    border border-red-300 rounded-lg bg-red-50 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                  "
                  placeholder="Minimum 8 characters"
                />
                <p className="mt-2 text-xs text-red-600">
                  <strong>Error:</strong> Password must be at least 8 characters
                </p>
              </div>

              {/* Textarea */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-green-600 text-xs">(Textarea)</span>
                </label>
                <textarea
                  rows={4}
                  className="
                    block w-full px-4 py-3
                    border border-gray-300 rounded-lg bg-white text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                    resize-none
                  "
                  placeholder="Type your message here..."
                ></textarea>
                <p className="mt-2 text-xs text-gray-500">
                  Same framework applied to textarea with <strong>resize-none</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* === BUTTON GALLERY SECTION === */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            3. Button Gallery - Different Sizes & States
          </h2>
          
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            
            {/* Button Size Examples */}
            <div className="mb-10">
              <h3 className="font-bold text-gray-700 mb-4">A. Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                {/* Extra Small */}
                <button className="
                  inline-flex items-center justify-center
                  px-3 py-1.5 text-xs
                  bg-blue-600 text-white font-medium rounded-md
                  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
                  transition-colors
                ">
                  X-Small (px-3 py-1.5)
                </button>

                {/* Small - THE STANDARD */}
                <button className="
                  inline-flex items-center justify-center
                  px-4 py-2 text-sm
                  bg-blue-600 text-white font-medium rounded-md
                  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
                  transition-colors
                ">
                  Small (px-4 py-2) ← Standard
                </button>

                {/* Medium */}
                <button className="
                  inline-flex items-center justify-center
                  px-5 py-2.5 text-base
                  bg-blue-600 text-white font-semibold rounded-lg
                  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
                  transition-colors
                ">
                  Medium (px-5 py-2.5)
                </button>

                {/* Large */}
                <button className="
                  inline-flex items-center justify-center
                  px-6 py-3 text-lg
                  bg-blue-600 text-white font-semibold rounded-lg
                  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
                  transition-colors
                ">
                  Large (px-6 py-3)
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Note:</strong> Size is controlled by <code>px-*</code> (horizontal padding) and <code>py-*</code> (vertical padding).
              </p>
            </div>

            {/* Button Style Examples */}
            <div className="mb-10">
              <h3 className="font-bold text-gray-700 mb-4">B. Button Styles</h3>
              <div className="flex flex-wrap items-center gap-4">
                {/* Primary */}
                <button className="
                  inline-flex items-center justify-center px-5 py-2.5
                  bg-blue-600 text-white font-semibold rounded-lg
                  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  transition-colors
                ">
                  Primary
                </button>

                {/* Secondary */}
                <button className="
                  inline-flex items-center justify-center px-5 py-2.5
                  bg-gray-200 text-gray-800 font-medium rounded-lg border border-gray-300
                  hover:bg-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-gray-400
                  transition-colors
                ">
                  Secondary
                </button>

                {/* Success */}
                <button className="
                  inline-flex items-center justify-center px-5 py-2.5
                  bg-green-600 text-white font-semibold rounded-lg
                  hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                  transition-colors
                ">
                  Success
                </button>

                {/* Danger */}
                <button className="
                  inline-flex items-center justify-center px-5 py-2.5
                  bg-red-600 text-white font-semibold rounded-lg
                  hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  transition-colors
                ">
                  Danger
                </button>

                {/* Outline */}
                <button className="
                  inline-flex items-center justify-center px-5 py-2.5
                  bg-transparent text-blue-600 font-semibold rounded-lg border-2 border-blue-600
                  hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  transition-colors
                ">
                  Outline
                </button>

                {/* Disabled */}
                <button 
                  disabled
                  className="
                    inline-flex items-center justify-center px-5 py-2.5
                    bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed
                    opacity-70
                  ">
                  Disabled
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Pro Tip:</strong> Keep the same <code>px-* py-*</code> values across buttons for consistent sizing.
              </p>
            </div>

            {/* Button with Icon */}
            <div>
              <h3 className="font-bold text-gray-700 mb-4">C. Buttons with Icons</h3>
              <div className="flex flex-wrap items-center gap-4">
                <button className="
                  inline-flex items-center justify-center px-5 py-2.5
                  bg-gray-900 text-white font-medium rounded-lg
                  hover:bg-black focus:ring-2 focus:ring-gray-800
                  transition-colors
                ">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Icon Left
                </button>

                <button className="
                  inline-flex items-center justify-center px-5 py-2.5
                  bg-indigo-600 text-white font-medium rounded-lg
                  hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500
                  transition-colors
                ">
                  Icon Right
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <button className="
                  inline-flex items-center justify-center p-3
                  bg-pink-500 text-white rounded-full
                  hover:bg-pink-600 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2
                  transition-colors
                ">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Use <code>inline-flex</code> with <code>items-center</code> to align icons and text.
              </p>
            </div>
          </div>
        </div>

        {/* === SUMMARY CARD === */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎯 Your 4-Step Framework Cheat Sheet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {step: "1. Layout", desc: "Start with display & positioning", example: "flex, inline-flex, block, w-full"},
              {step: "2. Spacing", desc: "Add padding & margins", example: "px-4 py-2, m-4"},
              {step: "3. Foundation", desc: "Apply colors, borders, text", example: "bg-blue-600 text-white rounded-lg"},
              {step: "4. States", desc: "Finish with hover/focus effects", example: "hover:bg-blue-700 focus:ring-2"}
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
                <div className="text-blue-600 font-bold text-lg mb-2">{item.step}</div>
                <p className="text-gray-600 text-sm mb-2">{item.desc}</p>
                <code className="text-xs bg-gray-50 p-1 rounded text-gray-700">{item.example}</code>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-100 border border-blue-200 rounded-lg">
            <p className="text-blue-800 font-medium">
              💡 <strong>Remember this order:</strong> Always style from the container outward. For buttons, start with Step 1-2 (layout/padding) to establish size, then add visual styles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}