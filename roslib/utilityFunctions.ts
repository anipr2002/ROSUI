// Types for ROS message definitions
interface TypeDef {
    fieldnames: string[];
    fieldtypes: string[];
    fieldarraylen: number[];
    type: string;
}

interface TypeDefDict {
    [key: string]: string | string[] | TypeDefDict | TypeDefDict[];
}

/**
 * Decodes a ROS message type definition array into a dictionary structure
 * Similar to the output of `rosmsg show foo/bar`
 *
 * @param defs - Array of type definition objects
 * @returns Decoded type definition dictionary
 */
class RosUtilFunctions {
    // Event emitter functionality would be implemented here
    private emit(event: string, message: string): void {
        // Implementation for error emission
        console.error(message);
    }

    public decodeTypeDefs(defs: TypeDef[]): TypeDefDict {
        const decodeTypeDefsRec = (
            theType: TypeDef,
            hints: TypeDef[]
        ): TypeDefDict => {
            const typeDefDict: TypeDefDict = {};

            for (let i = 0; i < theType.fieldnames.length; i++) {
                const arrayLen = theType.fieldarraylen[i];
                const fieldName = theType.fieldnames[i];
                const fieldType = theType.fieldtypes[i];

                // Check if the field type is a primitive type (doesn't contain '/')
                if (fieldType.indexOf('/') === -1) {
                    // If arrayLen is -1, it's not an array type
                    if (arrayLen === -1) {
                        typeDefDict[fieldName] = fieldType;
                    } else {
                        typeDefDict[fieldName] = [fieldType];
                    }
                } else {
                    // Look up the complex type in the hints
                    let sub: TypeDef | false = false;
                    for (const hint of hints) {
                        if (hint.type.toString() === fieldType.toString()) {
                            sub = hint;
                            break;
                        }
                    }

                    if (sub) {
                        const subResult = decodeTypeDefsRec(sub, hints);
                        if (arrayLen === -1) {
                            typeDefDict[fieldName] = subResult;
                        } else {
                            typeDefDict[fieldName] = [subResult];
                        }
                    } else {
                        this.emit('error', `Cannot find ${fieldType} in decodeTypeDefs`);
                    }
                }
            }

            return typeDefDict;
        };

        return decodeTypeDefsRec(defs[0], defs);
    }
}

export default RosUtilFunctions;
