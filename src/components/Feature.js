import React, { Fragment } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

/**
 * We need a new component called Searchable which:
 *
 * Has a template like this:
 *
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 *
 * When someone clicks the anchor tag, you should:
 *
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 *
 * Then start a try/catch/finally block:
 *
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch:
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
  const searchTerm = props.searchTerm;
  const searchValue = props.searchValue;
  const setIsLoading = props.setIsLoading;
  const setSearchResults = props.setSearchResults;

  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);

          try {
            const response = await fetchQueryResultsFromTermAndValue({
              searchTerm,
              searchValue,
            });
            const results = response.json();
            setSearchResults(results);
          } catch (error) {
            console.error("No SearchTerm or SearchValue found", error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {searchTerm}
        {searchValue}
      </a>
    </span>
  );
};

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */
const Feature = (props) => {
  const featuredResult = props.featuredResult;

  if (featuredResult) {
    const {
      // These are the facts used for featuredResult
      title,
      dated,
      images, //array?
      primaryimageurl,
      description,
      culture, //searchable?
      style,
      technique, //searchable?
      medium, //searchable?
      dimensions,
      people, //array? //searchable?
      department,
      division,
      contact,
      creditline,
    } = featuredResult;

    return (
      <main id="feature">
        <div className="object-feature">
          <header>
            <h3>{title}</h3>
            <h4>{dated}</h4>
          </header>
          <section className="facts">
            {description ? (
              <Fragment>
                <span className="title">Description</span>
                <span className="content">{description}</span>
              </Fragment>
            ) : null}

            {culture ? (
              <Fragment>
                <span className="title">Culture</span>
                <Searchable
                  //   searchTerm=
                  searchValue={culture}
                />
              </Fragment>
            ) : null}

            {style ? (
              <Fragment>
                <span className="title">Style</span>
                <span className="content">{style}</span>
              </Fragment>
            ) : null}

            {technique ? (
              <Fragment>
                <span className="title">Technique</span>
                <Searchable
                  // searchTerm?
                  searchValue={culture}
                />
              </Fragment>
            ) : null}

            {medium ? (
              <Fragment>
                <span className="title">Medium</span>
                <Searchable
                  // searchTerm?
                  searchValue={culture}
                />
              </Fragment>
            ) : null}

            {dimensions ? (
              <Fragment>
                <span className="title">Dimensions</span>
                <span className="content">{dimensions}</span>
              </Fragment>
            ) : null}

            {people ? (
              <Fragment>
                <span className="title">People</span>
                {people.map((person, index) => {
                  return (
                    <Searchable
                      key={index}
                      // searchTerm?
                      searchValue={person.displayname}
                    />
                  );
                })}
              </Fragment>
            ) : null}

            {department ? (
              <Fragment>
                <span className="title">Department</span>
                <span className="content">{department}</span>
              </Fragment>
            ) : null}

            {division ? (
              <Fragment>
                <span className="title">Division</span>
                <span className="content">{division}</span>
              </Fragment>
            ) : null}

            {contact ? (
              <Fragment>
                <span className="title">Contact</span>
                <span className="content">{contact}</span>
              </Fragment>
            ) : null}

            {creditline ? (
              <Fragment>
                <span className="title">Creditline</span>
                <span className="content">{creditline}</span>
              </Fragment>
            ) : null}
          </section>
          <section className="photos">
            {images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={primaryimageurl}
                  alt={image.description}
                />
              );
            })}
          </section>
        </div>
      </main>
    );
  } else {
    return <main id="feature"></main>;
  }
};

export default Feature;
