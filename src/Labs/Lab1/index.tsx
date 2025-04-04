export default function Lab1() {
  return (
    <div>
      <h2>Lab 1 - Natalia Ivanov (Web Development, CS4550 02 Spring 2025)</h2>
      <h3>HTML Examples</h3>
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        Text documents are often broken up into several sections and
        subsections. Each section is usually prefaced with a short title or
        heading that attempts to summarize the topic of the section it precedes.
        For instance this paragraph is preceded by the heading Heading Tags. The
        font of the section headings are usually larger and bolder than their
        subsection headings. This document uses headings to introduce topics
        such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags
        can be used to format plain text so that it renders in a browser as
        large headings. There are 6 heading tags for different sizes: h1, h2,
        h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest
        heading.
      </div>

      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">
          This is a paragraph. We often separate a long set of sentences with
          vertical spaces to make the text easier to read. Browsers ignore
          vertical white spaces and render all the text as one single set of
          sentences. To force the browser to add vertical spacing, wrap the
          paragraphs you want to separate with the paragraph tag
        </p>

        <p>
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p>
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default
          browsers render them as one contiguous piece of text as shown here on
          the right.
        </p>
        <p>
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers to render the gaps.
        </p>
      </div>

      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        How to make pancakes:
        <ol>
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>
        My favorite recipe (Spicy Vodka Pasta):
        <ol id="wd-your-favorite-recipe">
          <li>Chop 1/2 a shallot and 2 garlic cloves</li>
          <li>Saute the shallot in olive oil then add garlic</li>
          <li>Pour in 2 tablespoons of vodka</li>
          <li>Cook 1 pound of pasta</li>
          <li>
            Add less than one tsp of crushed red pepper, salt, 1/2 cup of tomato
            paste, and 1 cup of heavy cream
          </li>
          <li>Save 1 cup of pasta water</li>
          <li>
            Add 1/4 cup of grated parmesan, pasta water, and 1/4 cup chopped
            basil
          </li>
          <li>Pour pasta into sauce and add 2 tbs butter</li>
        </ol>
        <h5>Unordered List Tag</h5>
        My favorite books (in no particular order)
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender's Game</li>
          <li>Red Mars</li>
          <li>The Forever War</li>
        </ul>
        Your favorite books (in no particular order)
        <ul id="wd-your-books">
          <li>The Inheritance Games</li>
          <li>Normal People</li>
          <li>The Return</li>
          <li>The Hunger Games</li>
        </ul>
      </div>
      <div id="wd-forms">
        <h4>Form Elements</h4>
        {/* <p> */}
        <label htmlFor="wd-username">Username:</label>
        <input
          id="wd-username"
          name="wd-username"
          type="text"
          placeholder="jdoe"
          value="alice"
          title="Please type your username which must be unique"
        />
        {/* </p> */}
        <br />
        <label htmlFor="wd-password">Password:</label>
        <input id="wd-password" type="password" />
        <br />
        <label htmlFor="wd-salary">Salary:</label>
        <input
          id="wd-salary"
          value="100000"
          type="number"
          min="50000"
          max="1000000"
        />
      </div>
      <div>
        <h4>Buttons</h4>
        Select many favorite movie genres:
        <br />
        <input id="wd-comedy" type="checkbox" name="wd-genre" />
        Comedy
        <br />
        <label>
          <input type="checkbox" name="wd-genre" checked />
          Drama
        </label>
        <br />
        <input type="checkbox" name="wd-genre" />
        Sci-Fi
        <br />
        <input type="checkbox" name="wd-genre" />
        Horror
        <br />
        Choose your single favorite color:
        <br />
        <input type="radio" name="wd-color" />
        Yellow
        <br />
        <input type="radio" name="wd-color" checked />
        Blue
        <br />
        <input type="radio" name="wd-color" />
        Red
        <br />
      </div>
    </div>
  );
}
